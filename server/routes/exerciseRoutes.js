const express = require("express");
const cors = require("cors");
const { createExercise, getExercises } = require("../controllers/exerciseController");

const router = express.Router();

// Middleware
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)

router.post('/createexercise', createExercise);

// router.get('/exercises', getExercises);

module.exports = router;