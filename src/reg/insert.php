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

$name = $request['username'];
$email = $request['email'];
$password = $request['password'];
$passwordConfirm = $request['passwordConfirm'];

if(validateName($name) && validateEmail($email) && validatePassword($password) && !(userExists($users,$request))){
    echo json_encode([
        'status' => 400,
        'message' => 'Login successful' 
    ]);
    $save = [
        'name' => $name,
        'email' => $email,
        'password' => $password
    ];
    $users->add($save);
    print_r("Addolva");
}else{
    echo json_encode([
        'status' => 400,
        'message' => 'Login fail',
        'fail' => $fail_name
    ]);
}

function validateName($name){
    if($name == null || $name == ""){
        $fail_name = "Name";
        return false;
    }else{
        return true;
    }
}

function validateEmail($email){
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $fail_name = "Email";
        return false;
    }else{
        return true;
    }
}

function validatePassword($password){
    if($password == null || $password == ""){
        $fail_name = "Password";
        return false;
    }else{
        return true;
    }
}

function userExists($users, $user) {
    $found = $users->findAll(["email" => $user["email"]]);
    return (count($found) > 0);
}
?> 