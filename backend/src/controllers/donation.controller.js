const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createDonation = async (req, res) => {
  const { donorName, donorEmail, amount } = req.body;

  if (!donorName || !donorEmail || !amount) {
    return res.status(400).json({ message: "All fields required" });
  }

  const orderId = `DON_${Date.now()}`;

  const donation = await prisma.donation.create({
    data: {
      donorName,
      donorEmail,
      amount: Number(amount),
      orderId,
      status: "PENDING",
    },
  });

  res.status(201).json(donation);
};
