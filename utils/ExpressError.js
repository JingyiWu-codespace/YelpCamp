// @ts-nocheck

class ExpressError extends Error {
  constructor(message, statusCode) {
    super();
    this.messgae = message;
    this.statusCode = statusCode;
  }
}

module.exports = ExpressError;