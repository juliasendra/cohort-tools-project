const router = require("express").Router();

// GET /api/
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

module.exports = router;