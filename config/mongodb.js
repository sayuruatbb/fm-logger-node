const mongoose = require("mongoose");

const uri =
  "mongodb+srv://ssilva:MQBsEbWNYypACzyhWcf7@fm.qnqkg6u.mongodb.net/?retryWrites=true&w=majority&appName=FM";

const createMongoConnection = () => {
  mongoose
    .connect(uri)
    .then((prom) => console.log("Mongo DB connected."))
    .catch((err) => console.error(err));
};

module.exports = {
  createMongoConnection,
};
