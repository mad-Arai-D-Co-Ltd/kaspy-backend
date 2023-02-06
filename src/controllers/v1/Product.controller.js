const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const BaseController = require('./Base.controller');
const RequestHandler = require('../../utils/RequestHandler');
const Logger = require('../../utils/logger');
const logger = new Logger();
const requestHandler = new RequestHandler(logger);
const config = require('../../config/appconfig');

class ProductController extends BaseController {

  /**
   * It's a function that creates a product.
   */
   static async createProduct(req, res) {
    try {
      const data = req.body.data;
      
      const schema = Joi.object({
        productCode: Joi.string().allow("",null),
        name: Joi.string().allow("",null),
        price: Joi.number().allow("",null),
        createdByUserId: Joi.string().allow("",null),
      });
      const { error } = schema.validate(data);

      if (error) {
        requestHandler.validateJoi(
          error,
          400,
          'bad request',
          error ? error.details[0].message : ''
        );
      }

      const createNewProducts = await super.create(req, 'products',data);
      const newProdData = await createNewProducts.dataValues;

        const productUpdateData = {
            productId: newProdData.id,
            productCode: newProdData.productCode,
            name: newProdData.name,
            price: newProdData.price,
            updateByUserId: newProdData.createdByUserId 
        }

        const createdProductUpdate = await super.create(req, 'product_updates', productUpdateData);

        if (!_.isNull(createdProductUpdate)) {
        
        } else {
        requestHandler.throwError(
            422,
            'Unprocessable Entity',
            'Unable to process the contained instructions product update error'
        );
        }

      if (!_.isNull(createNewProducts)) {
        requestHandler.sendSuccess(
          res,
          'successfully created new products',
          201
        )(createNewProducts);
      } else {
        requestHandler.throwError(
          422,
          'Unprocessable Entity',
          'Unable to process the contained instructions'
        );
      }
    } catch (err) {
      requestHandler.sendError(req, res, err);
    }
  }

   /**
      * It's a function that update product.
      */
   static async updateProduct(req, res) {
    try {
        const data = req.body;
        const productId = req.params.productId;
        const schema = Joi.object({
            productCode: Joi.string().allow("",null),
            name: Joi.string().allow("",null),
            price: Joi.number().allow("",null),
            createdByUserId: Joi.string().allow("",null),
          });

        const { error } = schema.validate(data);

        if (error) {
            requestHandler.validateJoi(
                error,
                400,
                'bad request',
                error ? error.details[0].message : ''
            );
        };

        const option = {
            where : {
                id: productId
            }
          }

        const updatedProduct = await super.updateByCustomWhere(req, 'products',data,option);

        const productUpdateData = {
            productId: productId,
            productCode: data.productCode,
            name: data.name,
            price: data.price,
            updateByUserId: data.createdByUserId 
        }

        const createdProductUpdate = await super.create(req, 'product_updates', productUpdateData);

        if (!_.isNull(createdProductUpdate)) {
        
        } else {
        requestHandler.throwError(
            422,
            'Unprocessable Entity',
            'Unable to process the contained instructions product update error'
        );
        }

        if (!_.isNull(updatedProduct)) {
            requestHandler.sendSuccess(
                res,
                'successfully update blog',
                201
            )(updatedProduct);
        } else {
            requestHandler.throwError(
                422,
                'Unprocessable Entity',
                'Unable to process the contained instructions'
            );
        }

    } catch (err) {
        requestHandler.sendError(req, res, err);
    }
}

 /**
      * It's a function that update product list.
      */
 static async updateProductList(req, res) {
  try {
      const datas = req.body;
     
      let updatedProduct;
      let createdProductUpdate;

    await Object.values(datas).forEach(async(element) => {
        const option = {
          where : {
              id: element.id
          }
        }
        const data = {
          price : element.price
        }
       updatedProduct = await super.updateByCustomWhere(req, 'products',data,option);

       
        const productUpdateData = {
          productId: element.id,
          productCode: element.productCode,
          name: element.name,
          price: element.price,
          updateByUserId: element.createdByUserId 
        }

        createdProductUpdate = await super.create(req, 'product_updates', productUpdateData);
        if (!_.isNull(createdProductUpdate)) {
          
        } else {
          requestHandler.throwError(
              422,
              'Unprocessable Entity',
              'Unable to process the contained instructions product update error'
          );
        }

      });

      if (!_.isNull(updatedProduct)) {
          requestHandler.sendSuccess(
              res,
              'successfully update blog',
              201
          )(updatedProduct);
      } else {
          requestHandler.throwError(
              422,
              'Unprocessable Entity',
              'Unable to process the contained instructions'
          );
      }

  } catch (err) {
      requestHandler.sendError(req, res, err);
  }
}


  /**
   * It's a function that get all product
   */
  static async getProductList(req, res) {
    try {
        const options = {
          order: [['id', 'asc']],
        };
        const result = await super.getList(req, 'products', options);
        requestHandler.sendSuccess(
          res,
          'Getting all products successfully!',
        )({result});
      } catch (err) {
        requestHandler.sendError(req, res, err);
      }
  }

}


module.exports = ProductController;