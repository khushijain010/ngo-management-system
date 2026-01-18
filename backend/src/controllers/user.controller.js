const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getMe = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true
      }
    });
    res.json(user);
  } catch {
    res.status(500).json({ message: "Error fetching user" });
  }
};

exports.getMyDonations = async (req, res) => {
  try {
    const donations = await prisma.donation.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: "desc" }
    });
    res.json(donations);
  } catch {
    res.status(500).json({ message: "Error fetching donations" });
  }
};
