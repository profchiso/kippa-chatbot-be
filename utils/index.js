const { connectToDb } = require("./dbcon");
const {
  getAll,
  getOne,
  createDocument,
  updateDocument,
  deleteDocument,
} = require("./crudOperations");
const { STATUS_CODES, RESPONSE_TEXT } = require("./response");

module.exports = {
  connectToDb,
  getAll,
  getOne,
  createDocument,
  updateDocument,
  deleteDocument,
  STATUS_CODES,
  RESPONSE_TEXT,
};
