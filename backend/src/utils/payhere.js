const crypto = require("crypto");

exports.generatePayHereHash = ({
  merchantId,
  orderId,
  amount,
  currency,
  merchantSecret,
}) => {
  const hashedSecret = crypto
    .createHash("md5")
    .update(merchantSecret)
    .digest("hex")
    .toUpperCase();

  const hashString = merchantId + orderId + amount + currency + hashedSecret;

  return crypto
    .createHash("md5")
    .update(hashString)
    .digest("hex")
    .toUpperCase();
};
