const crypto = require("crypto");

exports.generateHash = (req, res) => {
  try {
    const { order_id, amount, currency } = req.body;

    if (!order_id || !amount || !currency) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const merchant_id = "1233650"; // sandbox merchant id
    const merchant_secret = "MzMxMzUwMTg3MDM5MjA3NDU2MzkxNTIxMzA4NDI0MjY0NjUyMjY2OQ==";

    const hash = crypto
      .createHash("md5")
      .update(
        merchant_id +
          order_id +
          amount +
          currency +
          crypto.createHash("md5").update(merchant_secret).digest("hex")
      )
      .digest("hex")
      .toUpperCase();

    res.json({ hash });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Hash generation failed" });
  }
};
