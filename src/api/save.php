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

if($request['task'] == "save"){
    handleSave($request, $users);
}elseif($request['task'] == "load"){
    handleLoad($request, $users);
}else{
    handleDelete($request, $users);
}

function handleSave($request, $users){
    $email = $request['email'];
    $game = $request['game'];
    $name = $request['name'];
    $found = $users->findOne(["email" => $email]);
    $new_save = [
        'save-date' => date("Y/m/d"),
        'save-name' => $name,
        'game-state' => $game
    ];
    $update = $found;
    $exists = false;
    for ($x = 0; $x < count($found['save']); $x++) {
        $found_save = $found['save'];
        if($found_save[$x]['save-name'] == $new_save['save-name'] || $found_save[$x]['game-state'] == $new_save['game-state']){
            $exists = true;
        }
    }
    if(!$exists){
        array_push($update['save'], $new_save);
        $users->update($found['id'], $update);
        echo json_encode([
            'status' => 400
        ]);
    }else{
        echo json_encode([
            'status' => 404,
            'error' => 'exists'
        ]);
    }
}

function handleLoad($request, $users){
    $email = $request['email'];
    $found = $users->findOne(["email" => $email]);
    $saves = $found['save'];
    echo json_encode([
        'status' => 400,
        'saves' => $saves
    ]);
}

function handleDelete($request, $users){
    $email = $request['email'];
    $gameToDelete = $request['game'];
    $exists = false;
    $found = $users->findOne(["email" => $email]);
    $update = [];
    for ($x = 0; $x < count($found['save']); $x++) {
        $found_save = $found['save'];
        if($found_save[$x] != $gameToDelete){
            array_push($update, $found_save[$x]);
        }else{
            $exists = true;
        }
    }
    $found['save'] = $update;
    if($exists){
        $users->update($found['id'], $found);
        echo json_encode([
            'status' => 400
        ]);
    }else{
        echo json_encode([
            'status' => 404,
            'error' => 'delete'
        ]);
    }
}
?>