import models from "../db/models";
import { response as responseHelper, queryHelper } from "../helpers";

const { TransactionCategory: Category } = models;

class CategoryController {
  static async createCategory(request, response) {
    const {
      userData: { id },
      body: { categoryName, type, icon },
    } = request;

    try {
      const category = await Category.findOne({
        where: { userId: id, categoryName },
      });
      if (category) {
        return responseHelper(
          response,
          409,
          "Error",
          "Category Already Exists",
          false
        );
      }
      const newCategory = await Category.create({
        categoryName,
        type,
        icon,
        userId: id,
      });
      return responseHelper(response, 201, "Success", newCategory, true);
    } catch (error) {
      return responseHelper(response, 500, "Error", error, false);
    }
  }

  static async getCategories(request, response) {
    const {
      userData: { id }
    } = request;

    try {
      const categories = await queryHelper.findAll(Category, {userId: id}, ['categoryName', 'type', 'userId', 'id', 'icon']);
      return responseHelper(response, 200, "Success", categories, true);
    } catch (error) {
      return responseHelper(response, 500, "Error", error);
    }
  }

  static async getCategoriesByType(request, response) {
    const {
      userData: { id },
      query: {type}
    } = request;

    try {
      const categories = await queryHelper.findAll(Category, {userId: id, type}, ['categoryName', 'type', 'userId', 'icon']);
      return responseHelper(response, 200, "Success", categories, true);
    } catch (error) {
      return responseHelper(response, 500, "Error", error);
    }
  }
}

export default CategoryController;
