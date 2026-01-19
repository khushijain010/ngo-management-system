const crypto = require("crypto");

exports.initPayHere = async (req, res) => {
  const { orderId, amount, name, email } = req.body;

  const merchant_id = process.env.PAYHERE_MERCHANT_ID;
  const merchant_secret = process.env.PAYHERE_SECRET;
  const currency = "LKR";

  // ✅ FIX 1: Format amount once so it's the same everywhere
  const formattedAmount = Number(amount).toFixed(2);

  const hash = crypto
    .createHash("md5")
    .update(
      merchant_id +
        orderId +
        formattedAmount + // Uses "100.00"
        currency +
        crypto.createHash("md5")
          .update(merchant_secret)
          .digest("hex")
          .toUpperCase() // ✅ FIX 2: Secret hash MUST be Uppercase
    )
    .digest("hex")
    .toUpperCase();

  res.json({
    sandbox: true,
    merchant_id,
    return_url: "http://127.0.0.1:5500/success.html",
    cancel_url: "http://127.0.0.1:5500/cancel.html",
    notify_url: "http://localhost/api/payhere/notify",
    order_id: orderId,
    items: "Donation",
    amount: formattedAmount, // ✅ FIX 1: Must match the Hash exactly ("100.00")
    currency,
    hash,
    first_name: name,
    last_name: "",
    email,
    phone: "0770000000",
    address: "Sri Lanka",
    city: "Colombo",
    country: "Sri Lanka"
  });
};