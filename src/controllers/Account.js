const { Sequelize } = require("sequelize");
import models from "../db/models";
import { response as responseHelper, queryHelper } from "../helpers";
import dayjs from "dayjs";

const Op = Sequelize.Op;
const { Account: AccountModel } = models;

class Account {
    static async instanciateAccounts(request, response) {
        console.log("here");
        const { userData } = request;
        try {
            // Create Cash Account
            const cashAccount = await AccountModel.create({
                userId: userData.id,
                balance: 0,
                name: "cashAccount"
            })

            // Create Goal Account
            const goalAccount = await AccountModel.create({
                userId: userData.id,
                balance: 0,
                name: "goalAccount"
            })

            const responseData = {cashAccount, goalAccount};
            return responseHelper(response, 200, "Success", responseData, true)
        } catch (error) {
            return responseHelper(response, 500, "Error", error, false);
        }
    }

    static async getAllAccounts(request, response){
        try {
            const { userData: { id }} = request;
        accounts = await AccountModel.findAll({
            where: { userId: id}, attributes: ["name", "balance"]
        })
        return responseHelper(response, 200, "Success", accounts, true);
        } catch (error) {
            return responseHelper(response, 500, "Error", error, true);
        }
    }

    static async getAccount(request, response){
        try {
            const { userData, params: { accountName }} = request;
            account = await AccountModel.findOne({ where: { userId: userData.id}, name: accountName});
            if(!account){
                return responseHelper(response, 404, "Error", "Account not found", false);
            }
            return responseHelper(response, 200, "Success", account, true);
        } catch (error) {
            return responseHelper(response, 500, "Error", error, false);
        }
    }
}

export default Account;