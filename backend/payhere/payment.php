<?php
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

$name = $data["name"];
$email = $data["email"];
$amount = number_format((float)$data["amount"], 2, '.', '');

$merchant_id = "1233650";
$merchant_secret = "MzMxMzUwMTg3MDM5MjA3NDU2MzkxNTIxMzA4NDI0MjY0NjUyMjY2OQ==";
$order_id = uniqid();
$currency = "LKR";

$hash = strtoupper(
    md5(
        $merchant_id .
        $order_id .
        $amount .
        $currency .
        strtoupper(md5($merchant_secret))
    )
);

echo json_encode([
    "merchant_id" => $merchant_id,
    "order_id" => $order_id,
    "amount" => $amount,
    "currency" => $currency,
    "hash" => $hash,
    "first_name" => $name,
    "email" => $email
]);
