const express = require("express");
const authMiddelware = require("../middelwares/authMiddelware");
const {
  getDonorsListConstroller,
  getHospitalsListConstroller,
  getOrganisationsListConstroller,
  updateUserController,
  deleteUserController,
  getAllInventories,
  deleteInventoryByAdmin,
} = require("../controllers/adminController");
const adminMiddelware = require("../middelwares/adminMiddelware");

// routes object
const router = express.Router();

// routes
//get donor list
router.get(
  "/donor-list",
  authMiddelware,
  adminMiddelware,
  getDonorsListConstroller
);
//get hospital list
router.get(
  "/hospital-list",
  authMiddelware,
  adminMiddelware,
  getHospitalsListConstroller
);
//get organisation list
router.get(
  "/organisation-list",
  authMiddelware,
  adminMiddelware,
  getOrganisationsListConstroller
);

// Delete hospital, donor, organisation by ID
router.delete(
  "/user/:id",
  authMiddelware,
  adminMiddelware,
  deleteUserController
);
// Delete inventory by ID
router.delete(
  "/inventory/:id",
  authMiddelware,
  adminMiddelware,
  deleteInventoryByAdmin
);

// Update hospital, donor, organisation by ID
router.put("/user/:id", authMiddelware, adminMiddelware, updateUserController);

// getting all the invertories on admin side
router.get("/get-all-inventories", authMiddelware, adminMiddelware, getAllInventories);

module.exports = router;
