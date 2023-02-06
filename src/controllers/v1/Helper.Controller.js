const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const BaseController = require('./Base.controller');
const RequestHandler = require('../../utils/RequestHandler');
const Logger = require('../../utils/logger');
const logger = new Logger();
const Sequelize = require("sequelize");
const requestHandler = new RequestHandler(logger);
const config = require('../../config/appconfig');

class HelperController extends BaseController {
    static async totalUpdate(req, res,id) {
        try {
          const optionsSum = {
            attributes: [[Sequelize.fn('sum', Sequelize.col('price')), 'total']],
            where:{"orderHisId" : id},
          };
          const sumData = await super.getList(req, 'order_product_historys', optionsSum);
          const total = sumData[0].dataValues.total;
          const dataUpdateSum = {
            total : total
          }
          const optionUpdate = {
            where : {
                id: id
            }
          }
          const updateSum = await super.updateByCustomWhere(req, 'order_historys',dataUpdateSum,optionUpdate);
          
          return updateSum;
          
        } catch (err) {
          requestHandler.sendError(req, res, err);
        }
      }
}

module.exports = HelperController;


