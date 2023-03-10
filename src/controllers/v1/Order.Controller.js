const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const BaseController = require('./Base.controller');
const RequestHandler = require('../../utils/RequestHandler');
const Logger = require('../../utils/logger');
const logger = new Logger();
const requestHandler = new RequestHandler(logger);
const config = require('../../config/appconfig');

class OrderController extends BaseController {

  /**
   * It's a function that creates a order template.
   */
   static async createOrderTemplate(req, res) {
    try {
      const data = req.body.data;
      
      const schema = Joi.object({
        customerName: Joi.string().allow("",null),
        address: Joi.string().allow("",null),
        taxId: Joi.string().allow("",null),
        attention: Joi.string().allow("",null),
        email: Joi.string().allow("",null),
        tel: Joi.string().allow("",null),
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

      const createNewTemplates = await super.create(req, 'order_templates',data);
      

      if (!_.isNull(createNewTemplates)) {
        requestHandler.sendSuccess(
          res,
          'successfully created new templates',
          201
        )(createNewTemplates);
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
   * It's a function that update a order template.
   */
  static async updateOrderTemplate(req, res) {
    try {
      const data = req.body;
      const orderTempId = req.params.orderTempId;
      // const schema = Joi.object({
      //   customerName: Joi.string().allow("",null),
      //   address: Joi.string().allow("",null),
      //   taxId: Joi.string().allow("",null),
      //   attention: Joi.string().allow("",null),
      //   email: Joi.string().allow("",null),
      //   tel: Joi.string().allow("",null),
      //   createdByUserId: Joi.number().allow("",null),
      // });
      // const { error } = schema.validate(data);
      
      // if (error) {
      //   requestHandler.validateJoi(
      //     error,
      //     400,
      //     'bad request',
      //     error ? error.details[0].message : ''
      //   );
      // }

      const option = {
        where : {
            id: orderTempId
        }
      }
      const dataTemp = {
        customerName: data.customerName,
        address: data.address,
        taxId: data.taxId,
        attention: data.attention,
        email: data.email,
        tel: data.tel,
        createdByUserId: data.createdByUserId,
      }
      const updateNewTemplates = await super.updateByCustomWhere(req, 'order_templates',dataTemp,option);

      const deleteProd = data.deleteId;
      
      await Object.values(deleteProd).forEach(async(element,key) => {
        
        const optionProd = {
          where : {
              id: element.id
          }
        }
        const deleteProdTemp = await super.deleteByIdWithOptions(req, 'order_product_templates', optionProd);
        if (!_.isNull(deleteProdTemp)) {
            
        } else {
          requestHandler.throwError(
            422,
            'Unprocessable Entity',
            'Error delete product temp'
          );
        }

      });

      const prod = data.order_product_templates;
      await Object.values(prod).forEach(async(element,key) => {
        const dataProd = {
            orderTempId: orderTempId,
            productId: element.productId,
            quantity: element.quantity,
            unitId: element.unitId,
        }
        const optionProd = {
          where : {
              id: element.id
          }
        }

        const orderProdTempHave = await super.getList(req, 'order_product_templates', optionProd);

        if(Object.values(orderProdTempHave).length > 0){
          const updateNewProducts = await super.updateByCustomWhere(req, 'order_product_templates',dataProd,optionProd);
          if (!_.isNull(updateNewProducts)) {
            
          } else {
            requestHandler.throwError(
              422,
              'Unprocessable Entity',
              'Error update new order product temp'
            );
          }
        } else {
          const createNewTemplates = await super.create(req, 'order_product_templates',dataProd);
          if (!_.isNull(createNewTemplates)) {
            
          } else {
            requestHandler.throwError(
              422,
              'Unprocessable Entity',
              'Error create new order product temp'
            );
          }
        }
      });

      if (!_.isNull(updateNewTemplates)) {
        requestHandler.sendSuccess(
          res,
          'successfully updated new templates',
          201
        )(updateNewTemplates);
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
   * It's a function that get all order temp
   */
  static async getOrderTempList(req, res) {
    try {
        const options = {
            include: [{
            model: req.app.get('db')['order_product_templates'],
            include: [{
                model: req.app.get('db')['products'],
              },{
                model: req.app.get('db')['units'],
              }],
            }],
            order: [['id', 'asc']],
        };
        const result = await super.getList(req, 'order_templates', options);
        requestHandler.sendSuccess(
          res,
          'Getting all order templates successfully!',
        )({result});
      } catch (err) {
        requestHandler.sendError(req, res, err);
      }
  }


  /**
   * It's a function that creates a order template.
   */
  static async createOrderTemplateProduct(req, res) {
    try {
      const data = req.body.data;
      
      const schema = Joi.object({
        orderTempId: Joi.string().allow("",null),
        productId: Joi.string().allow("",null),
        quantity: Joi.string().allow("",null),
        unitId: Joi.string().allow("",null),
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

      const createNewTemplates = await super.create(req, 'order_product_templates',data);
      

      if (!_.isNull(createNewTemplates)) {
        requestHandler.sendSuccess(
          res,
          'successfully created new product templates',
          201
        )(createNewTemplates);
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
      * It's a function that create product temp list.
      */
 static async createOrderProductTempList(req, res) {
  try {
      const datas = req.body;
     
      let createOrderProdTemp;

      await Object.values(datas).forEach(async(element) => {
        const data = element;
       createOrderProdTemp = await super.create(req, 'order_product_templates',data);
       
      });

      if (!_.isNull(createOrderProdTemp)) {
          requestHandler.sendSuccess(
              res,
              'successfully create order product',
              201
          )(createOrderProdTemp);
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
   * It's a function that deletes a product temp.
   */
   static async deleteProdTemp(req, res) {
    try {
      const optionsDeleteProdTemp = {
        where: {
          id: req.params.id,
        },
      };
      
      const result = await super.deleteByIdWithOptions(req, 'blogs', optionsDeleteProdTemp);
      
      requestHandler.sendSuccess(res, 'Delete product template successfully!')();
    } catch (err) {
      requestHandler.sendError(req, res, err);
    }
  }

}


module.exports = OrderController;