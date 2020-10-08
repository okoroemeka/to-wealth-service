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
  static async findOne(model, queryParameters) {
    return model.findOne({
      where: {
        ...queryParameters,
      },
    });
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
