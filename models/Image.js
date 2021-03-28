const { Schema, model } = require("mongoose");

const imageSchema = new Schema({
    img: { 
        data: Buffer, 
        contentType: String 
     }
});

module.exports = model("Image", imageSchema);