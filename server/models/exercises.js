const { mongoose } = require("mongoose");
const { Schema } = mongoose;

const exerciseSchema = new Schema({
    title: String,
    userId: String,
    group: String,
    repetitions: Number,
    weight: Number,
    sets: Number,
    complete: Boolean
})


const ExerciseModel = mongoose.model('Exercise', exerciseSchema);

module.exports = ExerciseModel;