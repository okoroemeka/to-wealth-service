import models from "../db/models";
import { response as responseHelper, queryHelper } from "../helpers";

const { Category } = models;

class CategoryController {
  static async createCategory(request, response) {
    const {
      userData: { id },
      body: { categoryName, type },
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
        userId: id,
      });
      return responseHelper(response, 201, "Success", newCategory, true);
    } catch (error) {
      return responseHelper(response, 500, "Error", error, false);
    }
  }

  static async getCategories(request, response) {
    const {
      userData: { id },
      query: {type}
    } = request;

    console.log({id});

    try {
      const categories = await queryHelper.findAll(Category, {userId: id, type}, ['categoryName', 'type', 'userId']);
      console.log({categories});
      return responseHelper(response, 200, "Success", categories, true);
    } catch (error) {
        console.log(error);
      return responseHelper(response, 500, "Error", error);
    }
  }
}

export default CategoryController;
