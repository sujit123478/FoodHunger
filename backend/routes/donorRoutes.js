const router = require("express").Router();
const donorDetails = require("../models/donorDetails");
const ngoRegistration = require("../models/ngoRegistration");
router.post("/donorDetails", async (req, res) => {
  try {
    const donorExists = await donorDetails.findOne({ email: req.body.email });
    if (donorExists) {
      return res
        .status(200)
        .send({ message: "Donor already exists", success: false });
    }
    const newDonor = new donorDetails(req.body); // Changed ngoRegistration to donorDetails
    await newDonor.save();
    res.send({
      message: "Donor registered successfully",
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

router.post("/findNearestPinCode", async (req, res) => {
  try {
    const { pinCode } = req.body;
    if (!pinCode) {
      return res.status(400).send({
        message: "PIN code is required",
        success: false,
      });
    }

    // Convert the given PIN code to a number
    const refPinCodeNumber = parseInt(pinCode, 10);

    // Define a function to calculate numerical distance
    const calculateDistance = (pc1, pc2) => Math.abs(pc1 - pc2);

    // Define a reasonable range for proximity
    const proximityRange = 3; // This can be adjusted based on your needs

    // Find all NGOs with PIN codes within the proximity range
    const nearestNGOs = await ngoRegistration.find().then((ngos) =>
      ngos.filter((ngo) => {
        const ngoPinCodeNumber = parseInt(ngo.Pin, 10);
        return (
          calculateDistance(refPinCodeNumber, ngoPinCodeNumber) <=
          proximityRange
        );
      })
    );

    if (nearestNGOs.length === 0) {
      return res.status(200).send({
        message: "No nearby NGOs found within the specified range",
        success: false,
      });
    }

    res.send({
      message: "Nearest NGOs found",
      success: true,
      data: nearestNGOs,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

module.exports = router;
