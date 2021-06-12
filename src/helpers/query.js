/**
 * DB query helpers
 */
class QueryHelpers {
  /**
   * @description - Finds a resources in the database
   * @param {object} model
   * @param {object} queryParameters
   * @returns {object} result
   */
  static async findOne(model, queryParameters, attributes) {
    return model.findOne({
      where: {
        ...queryParameters,
      },
    });
  }

  /**
   * @description - Finds a resources in the database by id
   * @param {object} model
   * @param {number} id
   * @returns {object} result
   */
  static async findById(model, id) {
    return model.findByPk(id);
  }

  /**
   * @description - update a resources in the database
   * @param {object} model
   * @param {object} data
   * @param {object} queryParameters
   * @param {boolean} returning
   * @param {boolean} individualHooks
   * @returns {object} result
   */
  static async update(model, data, queryParameters, returning = false, individualHooks = false) {
    return model.update(
      {
        ...data,
      },
      {
        where: {
          ...queryParameters
        },
        returning,
        individualHooks,
      },
    );
  }

  /**
   * @description - Finds a user in the database
   * @param {object} model
   * @param {object} queryParameters
   * @param {Array} attributes
   * @returns {object} result
   */
  static async findAll(model, queryParameters, attributes = []) {
    return model.findAll({
      where: {
        ...queryParameters,
      },
      attributes: [...attributes],
    });
  }
}

export default QueryHelpers;
