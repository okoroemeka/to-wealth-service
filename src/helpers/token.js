import jwt from 'jsonwebtoken';
import responseHelper from './response';

/**
 * @description class representing User Authentication with JWT
 *
 * @class VerifyUser
 */
class VerifyUser {
  /**
   *
   * @param {object} payload
   * @param {object} time
   * @returns {string} token
   */
  static generateToken(payload, time) {
    const token = jwt.sign({ payload }, process.env.TOKEN_SECRET_KEY, time);
    return token;
  }

  /**
   * @descriotion - verifies a token
   * @param {object} req - Response sent to the router
   * @param {object} res -Request sent to the router
   * @param {objec} next - callback function to transfer to the next method
   * @returns {object} - object represneting response message
   */
  static verifyToken(req, res, next) {
    const token = req.headers.authorization || req.body.token;
    if (!token) {
      return responseHelper(
        res,
        403,
        'Fail',
        'You need a token to perform this operation',
        false
      );
    }
    return jwt.verify(
      token,
      process.env.TOKEN_SECRET_KEY,
      (error, userData) => {
        if (error) {
          if (error.message.includes('signature')) {
            return responseHelper(
              res,
              400,
              'Fail',
              'Your input is not a JWT token'
            );
          }
          return responseHelper(res, 400, 'Fail', error.message, false);
        }
        req.userData = userData.payload;
        return next();
      }
    );
  }
}

export default VerifyUser;
