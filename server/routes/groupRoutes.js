const express = require("express");
const cors = require("cors");
const { create, fetch } = require("../controllers/groupController");

const router = express.Router();

// Middleware
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)

router.get('/:id', fetch);
router.post('/', create);

module.exports = router;