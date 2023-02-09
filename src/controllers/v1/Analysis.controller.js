const BaseController = require('./Base.controller');
const RequestHandler = require('../../utils/RequestHandler');
const Logger = require('../../utils/logger');
const { Op } = require("sequelize");
const Sequelize = require("sequelize");
const logger = new Logger();
const requestHandler = new RequestHandler(logger);

class AnalysisController extends BaseController {
  
    
    /**
   * It's a function that get all prod total
   */
  static async getProdTotalList(req, res) {
    try {
      var date = new Date();
      var now_utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(),
                      date.getUTCDate());
      var tomor_utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(),
      date.getUTCDate()+1);
      const nowDate = new Date(now_utc);
      const tomorrowDate = new Date(tomor_utc);

        const options = {
          attributes: [[Sequelize.fn('sum', Sequelize.col('quantity')), 'total']],
            include: [{
                model: req.app.get('db')['products'],
              },{
                model: req.app.get('db')['units'],
              }],
              where:{"createdAt" : {[Op.between]: [nowDate,tomorrowDate]}},
            order: [['productId', 'asc']],
            group: 'productId'
        };
        const result = await super.getList(req, 'order_product_historys', options);
        requestHandler.sendSuccess(
          res,
          'Getting all prod total successfully!',
        )({result});
      } catch (err) {
        requestHandler.sendError(req, res, err);
      }
  }

   /**
   * It's a function that get all prod price his
   */
   static async getProdPriceHis(req, res) {
    const productId = req.params.productId;
    try {
        const options = {
            where:{productId : productId},
            order: [['productId', 'asc']],
            limit:10
        };
        const result = await super.getList(req, 'product_updates', options);
        requestHandler.sendSuccess(
          res,
          'Getting all prod price successfully!',
        )({result});
      } catch (err) {
        requestHandler.sendError(req, res, err);
      }
  }

  /**
   * It's a function that get all weekly sales
   */
  static async getWeeklySales(req, res) {
    try {

        const dateObj = new Date();
        var first = dateObj.getDate() - dateObj.getDay();
        var last = first + 6;
        const firstday = new Date(dateObj.setDate(first)).toUTCString();
        const lastday = new Date(dateObj.setDate(last)).toUTCString();

        const options = {
          attributes: [[Sequelize.fn('sum', Sequelize.col('total')), 'total']],
          where:{"createdAt" : {[Op.between]: [firstday, lastday]}},
        };
        const result = await super.getList(req, 'order_historys', options);
        requestHandler.sendSuccess(
          res,
          'Getting all weekly sales successfully!',
        )({result});
      } catch (err) {
        requestHandler.sendError(req, res, err);
      }
  }

  /**
   * It's a function that get all weekly order
   */
  static async getWeeklyOrder(req, res) {
    try {
      const dateObj = new Date();
        var first = dateObj.getDate() - dateObj.getDay();
        var last = first + 6;
        const firstday = new Date(dateObj.setDate(first)).toUTCString();
        const lastday = new Date(dateObj.setDate(last)).toUTCString();

      const options = {
        attributes: [[Sequelize.fn('count', Sequelize.col('id')), 'total']],
        where:{"createdAt" : {[Op.between]: [firstday, lastday]}},
      };
      const result = await super.getList(req, 'order_historys', options);
      requestHandler.sendSuccess(
        res,
        'Getting all weekly order successfully!',
      )({result});
    } catch (err) {
      requestHandler.sendError(req, res, err);
    }
  }

  /**
   * It's a function that get all weekly new user
   */
  static async getWeeklyNewUser(req, res) {
    try {
      const dateObj = new Date();
        var first = dateObj.getDate() - dateObj.getDay();
        var last = first + 6;
        const firstday = new Date(dateObj.setDate(first)).toUTCString();
        const lastday = new Date(dateObj.setDate(last)).toUTCString();

      const options = {
        attributes: [[Sequelize.fn('count', Sequelize.col('id')), 'total']],
        where:{"createdAt" : {[Op.between]: [firstday, lastday]}},
      };
      const result = await super.getList(req, 'order_templates', options);
      requestHandler.sendSuccess(
        res,
        'Getting all weekly new user successfully!',
      )({result});
    } catch (err) {
      requestHandler.sendError(req, res, err);
    }
  }

  /**
   * It's a function that get all prod price his
   */
  static async getShopOrderTemp(req, res) {
    try {
        const options = {
          attributes: [[Sequelize.fn('count', Sequelize.col('customerName')), 'total']],
        };
        const result = await super.getList(req, 'order_templates', options);
        requestHandler.sendSuccess(
          res,
          'Getting all prod price successfully!',
        )({result});
      } catch (err) {
        requestHandler.sendError(req, res, err);
      }
  }

  /**
   * It's a function that get all weekly order top
   */
  static async getWeeklyOrderTop(req, res) {
    try {
      const dateObj = new Date();
        var first = dateObj.getDate() - dateObj.getDay();
        var last = first + 6;
        const firstday = new Date(dateObj.setDate(first)).toUTCString();
        const lastday = new Date(dateObj.setDate(last)).toUTCString();

      const options = {
        attributes: [['customerName','label'],[Sequelize.fn('sum', Sequelize.col('total')), 'value']],
        where:{"createdAt" : {[Op.between]: [firstday, lastday]}},
        group: 'orderTempId'
      };
      const result = await super.getList(req, 'order_historys', options);
      requestHandler.sendSuccess(
        res,
        'Getting all weekly order successfully!',
      )({result});
    } catch (err) {
      requestHandler.sendError(req, res, err);
    }
  }


}

module.exports = AnalysisController;
