const express = require("express");
const cors = require("cors");
const { createGroup, fetchGroups } = require("../controllers/groupController");
const GroupModel = require("../models/groups");

const router = express.Router();

// Middleware
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)

router.post('/create-group', createGroup);
// router.get('/fetch-groups/:id', fetchGroups);

router.get('/fetch-groups/:id', fetchGroups);

// router.get('/exercises', getExercises);

module.exports = router;