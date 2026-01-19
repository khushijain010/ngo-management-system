<?php
$merchant_id = $_POST['merchant_id'];
$order_id = $_POST['order_id'];
$payhere_amount = $_POST['payhere_amount'];
$payhere_currency = $_POST['payhere_currency'];
$status_code = $_POST['status_code'];
$md5sig = $_POST['md5sig'];

$merchant_secret = "NDE3NDMzNzk1MzE3MDM2OTY2NDQyNDQzNzI4MDk2NDA4NzMyODk4";

$local_md5sig = strtoupper(
    md5(
        $merchant_id .
        $order_id .
        $payhere_amount .
        $payhere_currency .
        $status_code .
        strtoupper(md5($merchant_secret))
    )
);

if ($local_md5sig === $md5sig && $status_code == 2) {
    // ✅ Payment successful
    // TODO: Save donation in DB
    file_put_contents("payments.log", json_encode($_POST) . PHP_EOL, FILE_APPEND);
}
