<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Disposition, Content-Type, Content-Length, Accept-Encoding");
header("Content-type:application/json");
include('storage.php');
ini_set('display_errors', 1);
$users = new Storage(new JsonIO('data/userdata.json'));

$request = json_decode(file_get_contents("php://input"),true);
$fail = "";

$email = $request['email'];
$password = $request['password'];
$name = "";

if(validateEmail($email) && validatePassword($password) && userExists($users, $request, $email, $password)){
    echo json_encode([
        'status' => 400,
        'name' => $name,
        'email' => $email,
        'message' => 'Login successful' 
    ]);
}else{
    echo json_encode([
        'status' => 404,
        'message' => 'Login fail',
        'fail' => $fail
    ]);
}

function validateEmail($email){
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        global $fail;
        $fail = "Email";
        return false;
    }else{
        return true;
    }
}

function validatePassword($password){
    if($password == null || $password == ""){
        global $fail;
        $fail = "Password";
        return false;
    }else{
        return true;
    }
}

function userExists($users, $user, $email, $password) {
    global $fail;
    global $name;
    $found = $users->findOne(["email" => $user["email"]]);
    if($found['email'] != $email) {
        $fail = "Email";
        return false;
    }
    if(!password_verify($password, $found['password'])){
        $fail = "Password";
        return false;
    }
    $name = $found['name'];
    return true;
}
?>