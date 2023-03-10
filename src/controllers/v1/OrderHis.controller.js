const Joi = require("joi");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const BaseController = require("./Base.controller");
const HelperController = require("./Helper.Controller");
const RequestHandler = require("../../utils/RequestHandler");
const Logger = require("../../utils/logger");
const logger = new Logger();
const { Op } = require("sequelize");
const Sequelize = require("sequelize");
const requestHandler = new RequestHandler(logger);
const config = require("../../config/appconfig");

class OrderController extends BaseController {
  /**
   * It's a function that creates a order history.
   */
  static async createOrderHistory(req, res) {
    try {
      const data = req.body;

      //   const schema = Joi.object({
      //     id: Joi.number().allow("",null),
      //     customerName: Joi.string().allow("",null),
      //     address: Joi.string().allow("",null),
      //     taxId: Joi.string().allow("",null),
      //     attention: Joi.string().allow("",null),
      //     email: Joi.string().allow("",null),
      //     tel: Joi.string().allow("",null),
      //     createdByUserId: Joi.number().allow("",null),
      //   });
      //   const { error } = schema.validate(data);

      //   if (error) {
      //     requestHandler.validateJoi(
      //       error,
      //       400,
      //       'bad request',
      //       error ? error.details[0].message : ''
      //     );
      //   }

      const dateObj = new Date();
      var month = dateObj.getUTCMonth();
      var monthText = ("0" + (dateObj.getUTCMonth() + 1)).slice(-2);
      var year = dateObj.getUTCFullYear();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month +1, 0);

      


      const options = {
        where:{"createdAt" : {[Op.between]: [firstDay, lastDay]}},
        order: [['id', 'asc']],
      };
      
      // create no
      const result = await super.getList(req, "order_historys", options);
      const length = (result.length + 1).toString();
      const pad = "00000";
      
      const ans = pad.substring(0, pad.length - length.length) + length;

      const dataOrderHis = {
        orderTempId: data.id,
        customerName: data.customerName,
        address: data.address,
        taxId: data.taxId,
        attention: data.attention,
        email: data.email,
        tel: data.tel,
        no: "IV" + year + monthText + ans,
        createdByUserId: data.createdByUserId,
      };

      const createNewOrderHistorys = await super.create(
        req,
        "order_historys",
        dataOrderHis
      );
      const { id } = await createNewOrderHistorys;

      let dataProd;

      const prod = data.order_product_templates;
      await Object.values(prod).forEach(async (element, key) => {
        dataProd = {
          orderHisId: id,
          productId: element.product.id,
          productCode: element.product.productCode,
          productName: element.product.name,
          price: element.product.price,
          costPrice: element.costPrice,
          quantity: element.quantity,
          unitId: element.unitId,
        };
        const createNewOrderProHistorys = await super.create(
          req,
          "order_product_historys",
          dataProd
        );

        if (key === Object.values(prod).length - 1) {
          const update = await HelperController.totalUpdate(req, res, id);
          console.log(update);
        }

        if (!_.isNull(createNewOrderProHistorys)) {
        } else {
          requestHandler.throwError(
            422,
            "Unprocessable Entity",
            "Error create new order product history"
          );
        }
      });

      if (!_.isNull(createNewOrderHistorys)) {
        requestHandler.sendSuccess(
          res,
          "successfully created new order historys",
          201
        )(createNewOrderHistorys);
      } else {
        requestHandler.throwError(
          422,
          "Unprocessable Entity",
          "Unable to process the contained instructions"
        );
      }
    } catch (err) {
      requestHandler.sendError(req, res, err);
    }
  }

  /**
   * It's a function that get all order his
   */
  static async getOrderHisList(req, res) {
    try {
      const data = req.body;
      const firstday = data.firstday;
      const lastday = data.lastday;
      const options = {
        include: [
          {
            model: req.app.get("db")["order_product_historys"],
            include: [
              {
                model: req.app.get("db")["units"],
              },
            ],
          },
        ],
        where:{"createdAt" : {[Op.between]: [firstday, lastday]}},
        order: [["id", "asc"]],
      };
      const result = await super.getList(req, "order_historys", options);

      requestHandler.sendSuccess(
        res,
        "Getting all order historys successfully!"
      )({ result });
    } catch (err) {
      requestHandler.sendError(req, res, err);
    }
  }

   /**
   * It's a function that update a order history.
   */
   static async updateOrderProdCostHistory(req, res) {
    try {
      const data = req.body;
      let updateNewProducts;
      await Object.values(data).forEach(async(element,key) => {
        const dataProd = {
          costPrice: element.costPrice,
          quantity: element.quantity,
        }
        const optionProd = {
          where : {
              id: element.id
          }
        }

        updateNewProducts = await super.updateByCustomWhere(req, 'order_product_historys',dataProd,optionProd);
      });

      if (!_.isNull(updateNewProducts)) {
        requestHandler.sendSuccess(
          res,
          'successfully updated new templates',
          201
        )(updateNewProducts);
      } else {
        requestHandler.throwError(
          422,
          'Unprocessable Entity',
          'Error update new order product history'
        );
      }

    } catch (err) {
      requestHandler.sendError(req, res, err);
    }
  }

  /**
   * It's a function that delete order his
   */
  static async deleteOrderHis(req, res) {
    try {
      
      const optionsProd = {
        where:{orderHisId: req.params.id,},
      };
      const resultProdList = await super.getList(req, "order_product_historys", optionsProd);
      let resultProd;
      if(resultProdList.length > 0){
        resultProd = await super.deleteByIdWithOptions(req, "order_product_historys", optionsProd);
      }

      if(!_.isNull(resultProd)){
        const options = {
          where:{id: req.params.id,},
        };
  
        const result = await super.deleteByIdWithOptions(req, "order_historys", options);

        if(!_.isNull(result)){
          requestHandler.sendSuccess(
            res,
            "Delete order historys successfully!"
          )({ result });
        }
      } else {
        requestHandler.throwError(
          422,
          'Unprocessable Entity',
          'Error delete order product history'
        );
      }

    } catch (err) {
      requestHandler.sendError(req, res, err);
    }
  }

}

module.exports = OrderController;
