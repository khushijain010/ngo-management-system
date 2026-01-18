const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createDonation = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ message: "Amount is required" });
    }

    const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createDonation = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Valid amount required" });
    }

    const orderId = "DON_" + Date.now();

    const donation = await prisma.donation.create({
      data: {
        amount: Number(amount),
        status: "PENDING",
        orderId,
        userId: req.user.id
      }
    });

    res.status(201).json({
      message: "Donation created",
      donation
    });
  } catch (err) {
    console.error("DONATION ERROR:", err);
    res.status(500).json({ message: "Donation creation failed" });
  }
};


    res.status(201).json(donation);
  } catch (err) {
    console.error("DONATION ERROR:", err);
    res.status(500).json({ message: "Donation creation failed" });
  }
};
