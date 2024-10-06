const express = require("express");
const authMiddelware = require("../middelwares/authMiddelware");
const { createInventoryController, getInventoryController } = require("../controllers/inventoryController");

const router = express.Router();

//routes
// ADD INVENTORY
router.post("/create-inventory", authMiddelware, createInventoryController)
router.get("/get-inventory", authMiddelware, getInventoryController);

module.exports = router;