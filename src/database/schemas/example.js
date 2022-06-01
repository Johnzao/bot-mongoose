const { Schema, model } = require("mongoose");

const exampleSchema = Schema({
    userId: String,
    Numero: Number,
    TrueOrFalse: Boolean,
})

module.exports = model("Example", exampleSchema);
