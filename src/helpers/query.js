/**
 * DB query helpers
 */
class QueryHelpers {
  /**
   * @description - Finds a user in the database
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
}

export default QueryHelpers;
