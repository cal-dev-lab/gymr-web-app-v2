const Exercises = require("../models/exercises");
const jwt = require("jsonwebtoken");

// Create exercise endpoint
const createExercise = async (req, res) => {
    try {
        const {
            title,
            userId,
            group,
            repetitions,
            weight,
            sets,
            complete
        } = req.body;

        // Check if title was entered
        if (!title) return res.json({
            error: "Title is required."
        });
        // Check if repetitions were entered
        if (!repetitions) return res.json({
            error: "Repetitions are required."
        });
        // Check if sets were entered
        if (!sets) return res.json({
            error: "Sets are required."
        });
        // Check if weight was entered
        if (!weight) return res.json({
            error: "Weight is required."
        });

        const exercise = await Exercises.create({
            title,
            userId,
            group,
            repetitions,
            weight,
            sets,
            complete
        });

        return res.json(exercise);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    createExercise
}