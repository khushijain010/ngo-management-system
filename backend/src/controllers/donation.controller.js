// const { PrismaClient } = require("@prisma/client");
// const crypto = require("crypto");

// const prisma = new PrismaClient();

// /**
//  * Initializes the donation by creating a record in the database
//  * and generating the security hash required by PayHere.
//  */
// async function initDonation(req, res) {
//   try {
//     const { name, email, amount } = req.body;

//     // 1. Validation: Ensure all required fields are present
//     if (!name || !email || !amount) {
//       return res.status(400).json({ error: "Missing required fields: name, email, or amount" });
//     }

//     // 2. Formatting: PayHere requires exactly 2 decimal places for the amount
//     const formattedAmount = Number(amount).toFixed(2);
//     const orderId = "DON_" + Date.now();

//     // 3. Database: Create a pending record
//     await prisma.donation.create({
//       data: {
//         orderId: orderId,
//         name: name,
//         email: email,
//         amount: Number(amount),
//         status: "PENDING",
//       },
//     });

//     // 4. Security: Generate the MD5 Hash exactly as PayHere expects
//     const merchant_id = process.env.PAYHERE_MERCHANT_ID;
//     const merchant_secret = process.env.PAYHERE_SECRET;
//     const currency = "LKR";

//     // Hash calculation: UpperCase(MD5(MerchantID + OrderID + Amount + Currency + UpperCase(MD5(MerchantSecret))))
//     const hashedSecret = crypto.createHash("md5").update(merchant_secret).digest("hex").toUpperCase();
//     const hash = crypto
//       .createHash("md5")
//       .update(merchant_id + orderId + formattedAmount + currency + hashedSecret)
//       .digest("hex")
//       .toUpperCase();

//     // 5. Response: Send the payload to the frontend
//     res.json({
//       sandbox: true, // Set to false for production
//       merchant_id: merchant_id,
//       return_url: "http://127.0.0.1:5500/frontend/success.html",
//       cancel_url: "http://127.0.0.1:5500/frontend/index.html",
//       notify_url: "http://localhost:5000/api/donation/notify",
//       order_id: orderId,
//       items: "NGO Donation",
//       amount: formattedAmount,
//       currency: currency,
//       hash: hash,
//       first_name: name,
//       last_name: "Donor",
//       email: email,
//       phone: "0771234567",
//       address: "Colombo",
//       city: "Colombo",
//       country: "Sri Lanka",
//     });
//   } catch (err) {
//     console.error("❌ INIT DONATION ERROR:", err.message);
//     res.status(500).json({ error: "Internal Server Error during initialization" });
//   }
// }

// /**
//  * Handles the server-to-server notification from PayHere (IPN)
//  * This updates the donation status in your database.
//  */
// async function notify(req, res) {
//   try {
//     // IMPORTANT: PayHere sends 'order_id' and 'status_code'
//     const { order_id, status_code } = req.body;

//     if (!order_id) {
//       console.error("⚠️ Notify received with no order_id");
//       return res.status(200).send("No order_id found");
//     }

//     // Update database based on status_code (2 = Success)
//     const updateResult = await prisma.donation.update({
//       where: { orderId: order_id },
//       data: {
//         status: status_code == 2 ? "SUCCESS" : "FAILED",
//       },
//     });

//     console.log(`✅ Donation ${order_id} updated to: ${updateResult.status}`);
    
//     // Always respond with 200 OK so PayHere doesn't keep retrying
//     res.status(200).send("OK");
//   } catch (err) {
//     console.error("❌ NOTIFY ERROR:", err.message);
//     // Even if database update fails, we send 200 to stop PayHere retries
//     res.status(200).send("OK");
//   }
// }

// module.exports = {
//   initDonation,
//   notify,
// };

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create donation (only SUCCESS stored)
exports.createDonation = async (req, res) => {
  try {
    const { amount, name, email, status, category } = req.body;

    // ✅ validate properly
    if (!amount || !name || !email) {
      return res.status(400).json({ message: "Missing fields" });
    }

    if (status !== "SUCCESS") {
      return res.status(400).json({ message: "Only SUCCESS allowed" });
    }

    const donation = await prisma.donation.create({
      data: {
        name,
        email,
        amount: Number(amount),
        status,
        category: category || "General"
      }
    });

    res.status(201).json(donation);
  } catch (err) {
    console.error("Donation error:", err);
    res.status(500).json({ message: "Donation failed" });
  }
};

// ADMIN: only SUCCESS donations
exports.getSuccessfulDonations = async (req, res) => {
  try {
    const donations = await prisma.donation.findMany({
      where: { status: "SUCCESS" },
      orderBy: { createdAt: "desc" }
    });

    res.json(donations);
  } catch {
    res.status(500).json({ message: "Fetch failed" });
  }
};

exports.getUserDonations = async (req, res) => {
  const { email } = req.params;

  try {
    const donations = await prisma.donation.findMany({
      where: { email },
      orderBy: { createdAt: "desc" }
    });

    res.json(donations);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user donations" });
  }
};

