const { PrismaClient } = require("@prisma/client");
const crypto = require("crypto");

const prisma = new PrismaClient();

<<<<<<< HEAD
/**
 * Initializes the donation by creating a record in the database
 * and generating the security hash required by PayHere.
 */
async function initDonation(req, res) {
  try {
    const { name, email, amount } = req.body;

    // 1. Validation: Ensure all required fields are present
    if (!name || !email || !amount) {
      return res.status(400).json({ error: "Missing required fields: name, email, or amount" });
    }

    // 2. Formatting: PayHere requires exactly 2 decimal places for the amount
    const formattedAmount = Number(amount).toFixed(2);
    const orderId = "DON_" + Date.now();

    // 3. Database: Create a pending record
    await prisma.donation.create({
=======
// CREATE DONATION
exports.createDonation = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Valid amount required" });
    }
    const orderId = "DON_" + Date.now();


    const donation = await prisma.donation.create({
>>>>>>> a5e6bea27c57333d9923e43a67b386d89a0a28a4
      data: {
        orderId: orderId,
        name: name,
        email: email,
        amount: Number(amount),
        status: "PENDING",
      },
    });

<<<<<<< HEAD
    // 4. Security: Generate the MD5 Hash exactly as PayHere expects
    const merchant_id = process.env.PAYHERE_MERCHANT_ID;
    const merchant_secret = process.env.PAYHERE_SECRET;
    const currency = "LKR";

    // Hash calculation: UpperCase(MD5(MerchantID + OrderID + Amount + Currency + UpperCase(MD5(MerchantSecret))))
    const hashedSecret = crypto.createHash("md5").update(merchant_secret).digest("hex").toUpperCase();
    const hash = crypto
      .createHash("md5")
      .update(merchant_id + orderId + formattedAmount + currency + hashedSecret)
      .digest("hex")
      .toUpperCase();

    // 5. Response: Send the payload to the frontend
    res.json({
      sandbox: true, // Set to false for production
      merchant_id: merchant_id,
      return_url: "http://127.0.0.1:5500/frontend/success.html",
      cancel_url: "http://127.0.0.1:5500/frontend/index.html",
      notify_url: "http://localhost:5000/api/donation/notify",
      order_id: orderId,
      items: "NGO Donation",
      amount: formattedAmount,
      currency: currency,
      hash: hash,
      first_name: name,
      last_name: "Donor",
      email: email,
      phone: "0771234567",
      address: "Colombo",
      city: "Colombo",
      country: "Sri Lanka",
    });
  } catch (err) {
    console.error("❌ INIT DONATION ERROR:", err.message);
    res.status(500).json({ error: "Internal Server Error during initialization" });
=======
     res.status(201).json({
      message: "Donation created",
      donation
    });
  }catch (err) {
    console.error("DONATION ERROR:", err);
    res.status(500).json({ message: "Donation creation failed" });
>>>>>>> a5e6bea27c57333d9923e43a67b386d89a0a28a4
  }
}

<<<<<<< HEAD
/**
 * Handles the server-to-server notification from PayHere (IPN)
 * This updates the donation status in your database.
 */
async function notify(req, res) {
  try {
    // IMPORTANT: PayHere sends 'order_id' and 'status_code'
    const { order_id, status_code } = req.body;

    if (!order_id) {
      console.error("⚠️ Notify received with no order_id");
      return res.status(200).send("No order_id found");
    }

    // Update database based on status_code (2 = Success)
    const updateResult = await prisma.donation.update({
      where: { orderId: order_id },
      data: {
        status: status_code == 2 ? "SUCCESS" : "FAILED",
      },
    });

    console.log(`✅ Donation ${order_id} updated to: ${updateResult.status}`);
    
    // Always respond with 200 OK so PayHere doesn't keep retrying
    res.status(200).send("OK");
  } catch (err) {
    console.error("❌ NOTIFY ERROR:", err.message);
    // Even if database update fails, we send 200 to stop PayHere retries
    res.status(200).send("OK");
  }
}

module.exports = {
  initDonation,
  notify,
};
=======
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

>>>>>>> a5e6bea27c57333d9923e43a67b386d89a0a28a4
