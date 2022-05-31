const { Schema, model } = require("mongoose");

const exampleSchema = Schema({
    userId: String,
    Numero: number,
    TrueOrFalse: Boolean,
})

module.exports = model("Example", exampleSchema);