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

$name = $request['username'];
$email = $request['email'];
$password = $request['password'];
$passwordConfirm = $request['passwordConfirm'];

if(validateName($name) && validateEmail($email) && validatePassword($password, $passwordConfirm) && !(userExists($users,$request))){
    echo json_encode([
        'status' => 400,
        'message' => 'Register successful' 
    ]);
    $save = [
        'name' => $name,
        'email' => $email,
        'password' => password_hash($password, PASSWORD_DEFAULT),
        'save' => []
    ];
    $users->add($save);
}else{
    echo json_encode([
        'status' => 404,
        'message' => 'Register fail',
        'fail' => $fail
    ]);
}

function validateName($name){
    if($name == null || $name == "" || count($name) > 50){
        global $fail;
        $fail = "Name";
        return false;
    }else{
        return true;
    }
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

function validatePassword($password, $passwordConfirm){
    if($password == null || $password == "" || $password != $passwordConfirm || count($password) > 30){
        global $fail;
        $fail = "Password";
        return false;
    }else{
        return true;
    }
}

function userExists($users, $user) {
    global $fail;
    $fail = "Duplicate";
    $found = $users->findAll(["email" => $user["email"]]);
    return (count($found) > 0);
}
?> 