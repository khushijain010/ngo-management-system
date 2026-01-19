const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// CREATE DONATION
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
  }catch (err) {
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

exports.updateDonationStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (!orderId || !status) {
      return res.status(400).json({ message: "Invalid data" });
    }

    const donation = await prisma.donation.update({
      where: { orderId },
      data: { status }
    });

    res.json({ message: "Donation updated", donation });
  } catch (err) {
    console.error("UPDATE DONATION ERROR:", err);
    res.status(500).json({ message: "Update failed" });
  }
};
exports.verifyDonation = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (!orderId || !status) {
      return res.status(400).json({ message: "orderId and status required" });
    }

    const donation = await prisma.donation.findUnique({
      where: { orderId }
    });

    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    const updatedDonation = await prisma.donation.update({
      where: { orderId },
      data: { status }
    });

    res.json({
      message: "Donation status updated",
      donation: updatedDonation
    });

  } catch (err) {
    console.error("VERIFY ERROR:", err);
    res.status(500).json({ message: "Update failed" });
  }
};

