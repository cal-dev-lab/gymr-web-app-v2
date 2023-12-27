const { mongoose } = require("mongoose");
const { Schema } = mongoose;

const groupSchema = new Schema({
    title: String,
    userId: String
})


const GroupModel = mongoose.model('Group', groupSchema);

module.exports = GroupModel;