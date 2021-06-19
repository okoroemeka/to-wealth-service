import models from "../db/models";
import { response as responseHelper, queryHelper } from "../helpers";

const { Networth } = models;

class NetworthController {
  static async createNetworth(request, response) {
    const {
      userData,
      body: { name, amount, type },
    } = request;
    try {
      const existingNetworth = await queryHelper.findOne(Networth, {
        ownerId: userData.id,
        name,
        type,
      });
      if (existingNetworth) {
        // Update the amount
        const [_, updatedNetworth] = await Networth.update(
          { amount: existingNetworth.amount + parseFloat(amount) },
          { where: { ownerId: userData.id, type, name } }
        );

        return responseHelper(response, 201, "Success", updatedNetworth, true);
      }
      const newNetworth = await Networth.create({
        name,
        amount,
        type,
        ownerId: userData.id,
      });
      return responseHelper(response, 200, "Success", newNetworth, true);
    } catch (error) {
      console.log({ error });
      return responseHelper(response, 500, "Error", error, false);
    }
  }

  static async increaseValue(request, response) {
    try {
      const {
        userData,
        params: { id },
        body: { amount },
      } = request;
      const networth = await queryHelper.findOne(Networth, {
        id,
        ownerId: userData.id,
      });
      if (!networth) {
        return responseHelper(response, 404, "Not Found", "Not Found", false);
      }
      await Networth.update(
        { amount: networth.amount + parseInt(amount) },
        { where: { id, ownerId: userData.id } }
      );
      return responseHelper(response, 201, "Success", "Networth Updated", true);
    } catch (error) {
      return responseHelper(response, 500, "Error", error, false);
    }
  }

  static async decreaseValue(request, response) {
    try {
      const {
        userData,
        params: { id },
        body: { amount },
      } = request;
      const networth = await queryHelper.findOne(Networth, {
        id,
        ownerId: userData.id,
      });
      if (!networth) {
        return responseHelper(response, 404, "Not Found", "Not Found", false);
      }
      const [_, updatedNetworth] = await Networth.update(
        { amount: networth.amount - parseInt(amount) },
        { where: { id, ownerId: userData.id } }
      );
      return responseHelper(response, 201, "Success", updatedNetworth, true);
    } catch (error) {
      return responseHelper(response, 500, "Error", error, false);
    }
  }

  static async getNetworths(request, response) {
    try {
      const {
        userData: { id },
      } = request;
      const networths = await queryHelper.findAll(
        Networth,
        {
          ownerId: id,
        },
        ["id", "name", "type", "amount"]
      );
      return responseHelper(response, 200, "Success", networths, true);
    } catch (error) {
      return responseHelper(response, 500, "Error", error, false);
    }
  }

  static async getNetworthById(request, response) {
    try {
      const { userData, params: {id} } = request;
      const networth = await queryHelper.findOne(Networth, {id, ownerId: userData.id});
      return responseHelper(response, 200, "Success", networth, true);
    } catch (error) {
      return responseHelper(response, 500, "Error", error, false);
    }
  }
}

export default NetworthController;
