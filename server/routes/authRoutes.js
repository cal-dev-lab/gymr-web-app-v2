const express = require("express");
const cors = require("cors");
const { test } = require("../controllers/authController");

const router = express.Router();

// Middleware
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)

router.get('/', test)

module.exports = router;