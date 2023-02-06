const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const BaseController = require('./Base.controller');
const RequestHandler = require('../../utils/RequestHandler');
const Logger = require('../../utils/logger');
const logger = new Logger();
const requestHandler = new RequestHandler(logger);
const config = require('../../config/appconfig');

class UnitController extends BaseController {

  /**
   * It's a function that creates a unit.
   */
   static async createUnit(req, res) {
    try {
      const data = req.body.data;
      
      const schema = Joi.object({
        name: Joi.string().allow("",null),
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

      const createNewUnits = await super.create(req, 'units',data);
      

      if (!_.isNull(createNewUnits)) {
        requestHandler.sendSuccess(
          res,
          'successfully created new units',
          201
        )(createNewUnits);
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
   * It's a function that get all units
   */
  static async getUnitsList(req, res) {
    try {
        const options = {
          order: [['id', 'asc']],
        };
        const result = await super.getList(req, 'units', options);
        requestHandler.sendSuccess(
          res,
          'Getting all units successfully!',
        )({result});
      } catch (err) {
        requestHandler.sendError(req, res, err);
      }
  }

}


module.exports = UnitController;