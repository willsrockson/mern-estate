const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => {
    res.json({ message: "Hey I responded from the server" });
});

module.exports = router;
