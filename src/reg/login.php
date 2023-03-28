<?php
include('storage.php');
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Disposition, Content-Type, Content-Length, Accept-Encoding");
header("Content-type:application/json");
ini_set('display_errors', 1);
$users = new Storage(new JsonIO('data/userdata.json'));

$request = json_decode(file_get_contents("php://input"),true);
$fail_name = "";


?>