<?php
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

$name = $data["name"];
$email = $data["email"];
$amount = number_format((float)$data["amount"], 2, '.', '');

$merchant_id = "1233650";
$merchant_secret = "NDE3NDMzNzk1MzE3MDM2OTY2NDQyNDQzNzI4MDk2NDA4NzMyODk4";
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
