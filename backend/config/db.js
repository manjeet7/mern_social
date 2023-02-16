const mongoose = require("mongoose");

const url = "mongodb://127.0.0.1:27017";

mongoose.connect("mongodb://127.0.0.1:27017", {
    useNewUrlParser: true,
});
