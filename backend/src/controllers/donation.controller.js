const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// CREATE DONATION
exports.createDonation = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Valid amount required" });
    }

    const donation = await prisma.donation.create({
      data: {
        amount: Number(amount),
        status: "PENDING",
        userId: req.user.id
      }
    });

    res.status(201).json(donation);
  } catch (err) {
    console.error("DONATION ERROR:", err);
    res.status(500).json({ message: "Donation creation failed" });
  }
};

// USER: GET MY DONATIONS
exports.getMyDonations = async (req, res) => {
  try {
    const donations = await prisma.donation.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: "desc" }
    });

    res.json(donations);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch donations" });
  }
};

// ADMIN: GET ALL DONATIONS
exports.getAllDonations = async (req, res) => {
  try {
    const donations = await prisma.donation.findMany({
      include: { user: true },
      orderBy: { createdAt: "desc" }
    });

    res.json(donations);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch all donations" });
  }
};