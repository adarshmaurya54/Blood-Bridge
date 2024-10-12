const express = require("express");
const authMiddelware = require("../middelwares/authMiddelware");
const { createInventoryController, getInventoryController, getDonorsController, getHospitalsController } = require("../controllers/inventoryController");

const router = express.Router();

//routes
// ADD INVENTORY
router.post("/create-inventory", authMiddelware, createInventoryController)
router.get("/get-inventory", authMiddelware, getInventoryController);
router.get("/get-donors", authMiddelware, getDonorsController);
router.get("/get-hospitals", authMiddelware, getHospitalsController);

module.exports = router;