const inventoryModel = require("../model/inventoryModel");
const userModel = require("../model/userModel");

// create inventory
const createInventoryController = async (req, res) => {
  try {
    const { email, inventoryType } = req.body; // destructuring email from the request body
    const user = await userModel.findOne({ email });

    if (!user) {
      throw new Error("User Not found");
    }
    if (inventoryType === "in" && user.role !== "donar") {
      throw new Error("Not a donar account");
    }
    if (inventoryType === "out" && user.role !== "hospital") {
      throw new Error("Not a hospital");
    }
    // save record
    const inventory = new inventoryModel(req.body);
    await inventory.save();
    return res.status(201).send({
      success: true,
      message: "new blood record added",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in create inventory API",
      error,
    });
  }
};

//get all blood records
const getInventoryController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find({
        donar: req.body.userId,
      })
      .populate("donar")
      .populate("organisation")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "get all records of inventory successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in get all inventory",
      error,
    });
  }
};

module.exports = {
  createInventoryController,
  getInventoryController,
};
