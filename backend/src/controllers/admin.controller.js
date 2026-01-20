const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getDashboardStats = async (req, res) => {
  const totalUsers = await prisma.user.count();
  const totalDonations = await prisma.donation.count({
    where: { status: "SUCCESS" },
  });

  const totalAmount = await prisma.donation.aggregate({
    _sum: { amount: true },
    where: { status: "SUCCESS" },
  });

  res.json({
    totalUsers,
    totalDonations,
    totalAmount: totalAmount._sum.amount || 0,
  });
};

exports.getAllUsers = async (req, res) => {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  res.json(users);
};
