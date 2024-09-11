const router = require("express").Router();
const ngoRegistration = require("../models/ngoRegistration");
const donateRequest = require("../models/donorDetails");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");
router.post("/ngoRegister", async (req, res) => {
  try {
    console.log(req.body);
    const userExists = await ngoRegistration.findOne({ email: req.body.email });
    if (userExists) {
      return res
        .status(200)
        .send({ message: "User already exists", success: false });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.Password, salt);
    req.body.Password = hashedPassword;

    // Create new NGO user with location
    const newUser = new ngoRegistration(req.body);
    await newUser.save();
    res.send({
      message: "NGO registered successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});
router.post("/ngoLogin", async (req, res) => {
  try {
    const user = await ngoRegistration.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "user not exits", success: false });
    }
    const validPassword = await bcrypt.compare(
      req.body.Password,
      user.Password
    );
    if (!validPassword) {
      return res
        .status(200)
        .send({ message: "password is incorrect", success: false });
    }
    const token = jwt.sign({ ngoId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    console.log(token);
    res.send({
      message: "user Login successfully",
      success: true,
      data: token,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
      data: err,
      success: false,
    });
  }
});
router.post("/get-ngo-request", authMiddleware, async (req, res) => {
  try {
    const data = await ngoRegistration.findOne({ _id: req.body.ngoId });
    console.log(data);
    const donorDetails = await donateRequest.findOne({ ngoEmail: data.email });
    console.log(donorDetails);
    res.send({
      message: "User info successfully fetched",
      success: true,
      data: donorDetails,
    });
  } catch (error) {
    res.status(404).send({
      message: "User info failed",
      success: false,
      data: error,
    });
  }
});

module.exports = router;
