const express = require("express")
const router = express.Router()

const IndexController = require("../controllers/index.controller")

router.get("/", IndexController.index)
router.get("/coin-route", IndexController.coin)
router.get("/exchange-route", IndexController.exchange)

module.exports = router
