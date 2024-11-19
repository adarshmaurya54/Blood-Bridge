const inventoryModel = require("../model/inventoryModel");
const userModel = require("../model/userModel");
//get donor lists
const getDonorsListConstroller = async (req, res) => {
  try {
    const donorData = await userModel
      .find({ role: "donor" })
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      totalCount: donorData.length,
      message: "Donor list fetch successfully",
      donorData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in donor list api",
      error,
    });
  }
};
// get hospital lists
const getHospitalsListConstroller = async (req, res) => {
  try {
    const hospitalData = await userModel
      .find({ role: "hospital" })
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      totalCount: hospitalData.length,
      message: "Hospital list fetch successfully",
      hospitalData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in hospital list api",
      error,
    });
  }
};
// get organisation lists
const getOrganisationsListConstroller = async (req, res) => {
  try {
    const organisationData = await userModel
      .find({ role: "organisation" })
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      totalCount: organisationData.length,
      message: "Organisation list fetch successfully",
      organisationData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in organisation list api",
      error,
    });
  }
};
//deleting donor by id
const deleteUserController = async (req, res) => {
  try {
    const donorId = req.params.id;
    const deletedDonor = await userModel.findByIdAndDelete(donorId);

    if (!deletedDonor) {
      return res.status(404).send({
        success: false,
        message: "Donor not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Donor deleted successfully",
      deletedDonor,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in deleting donor",
      error,
    });
  }
};

// update hospital
const updateUserController = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const updatedUser = await userModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).send({
        success: false,
        message: `${req.body.role} not found`,
      });
    }

    return res.status(200).send({
      success: true,
      message: `${req.body.role} updated successfully`,
      updatedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: `Error updating ${req.body.role}`,
      error,
    });
  }
};

const getAllInventories = async (req, res) => {
  try {
    const inventories = await inventoryModel
      .find()
      .populate("donor")
      .populate("hospital")
      .populate("organisation")
      .sort({ createdAt: -1 }); // Use `await` to resolve the promise
    if (!inventories || inventories.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No inventory found!",
      });
    }
    return res.status(200).send({
      success: true,
      message: `${inventories.length} "Inventories fetched successfully"`,
      data: inventories,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: `Error in fetching inventory`,
      error,
    });
  }
};

const deleteInventoryByAdmin = async (req, res) => {
  try {
    const inventoryId = req.params.id;
    const deletedInventory = await inventoryModel.findByIdAndDelete(inventoryId);

    if (!deletedInventory) {
      return res.status(404).send({
        success: false,
        message: "Inventory not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Inventory deleted successfully",
      deletedInventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in deleting inventory",
      error,
    });
  }
};

module.exports = {
  getDonorsListConstroller,
  getHospitalsListConstroller,
  getOrganisationsListConstroller,
  deleteUserController,
  updateUserController,
  getAllInventories,
  deleteInventoryByAdmin
};
