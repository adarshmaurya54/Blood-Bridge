const userModel = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const registerController = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({email: req.body.email});
    //validation
    if(existingUser){
        return res.status(200).send({
            success: false,
            message: 'User Already Exists'
        })
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    //rest data
    const user = new userModel(req.body);
    await user.save();
    return res.status(201).send({
        success: true,
        message: "User Registrated Successfully",
        user
    })
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error In Register API",
      err,
    });
  }
};

// login callback
const loginController = async (req, res) => {
    try{
        const user = await userModel.findOne({email: req.body.email})

        if(!user){
            return res.status(404).send({
                success: false, 
                message: "Invalid credentials"
            })
        }
        // check role

        if(user.role !== req.body.role){
            return res.status(500).send({
                success: false,
                message: "User role doesn't match!"
            })
        }

        // compare password
        const comparePassword = await bcrypt.compare(req.body.password, user.password)
        if(!comparePassword){
            return res.status(500).send({
                success: false,
                message: 'Invalid Credentials'
            })
        }

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});
        return res.status(200).send({
            success: true,
            message: "Login successfully...",
            token,
            user
        })

    }catch(err){
        console.log(err);
        res.status(500).send({
            success: false,
            message: "Error in login API",
            err
        })
        
    }
}

// get current user
const currentUserController = async (req, res) => {
    try {
        const user = await userModel.findOne({_id: req.body.userId});
        return res.status(200).send({
            success: true,
            message: 'User fetched successfully...',
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'unable to get current user',
            error
        })
    }
}

module.exports = {
  registerController,
  loginController,
  currentUserController
};