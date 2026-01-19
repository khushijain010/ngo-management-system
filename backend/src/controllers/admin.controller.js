const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getStats = async (req, res) => {
  try {
    const totalUsers = await prisma.user.count();

    const totalDonations = await prisma.donation.count();

    const sumAmount = await prisma.donation.aggregate({
      _sum: { amount: true },
      where: { status: "SUCCESS" }
    });

    const pending = await prisma.donation.count({
      where: { status: "PENDING" }
    });

    const failed = await prisma.donation.count({
      where: { status: "FAILED" }
    });

    res.json({
      totalUsers,
      totalDonations,
      totalAmount: sumAmount._sum.amount || 0,
      pending,
      failed
    });
  } catch (err) {
    console.error("ADMIN STATS ERROR:", err);
    res.status(500).json({ message: "Stats fetch failed" });
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    });

    res.json(users);
  } catch (err) {
    console.error("ADMIN USERS ERROR:", err);
    res.status(500).json({ message: "Users fetch failed" });
  }
};
exports.getAllDonations = async (req, res) => {
  try {
    const donations = await prisma.donation.findMany({
      orderBy: { createdAt: "desc" }
    });

    res.json(donations);
  } catch (err) {
    console.error("ADMIN DONATIONS ERROR:", err);
    res.status(500).json({ message: "Donations fetch failed" });
  }
};


