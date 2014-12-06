<?php
header('Content-Type: text/html; charset=utf-8');
include './phpFunctions.php';
include './mongoDB.php';

$name=$password="";
$registeredUsers;
$manager = new DBManager();

if($_SERVER["REQUEST_METHOD"]=="POST")
{
    $name = testInput($_POST["username"]);
    $password = testInput($_POST["password"]);


    $nameFree = $manager->testUsernameAvailable($name);

    if ($nameFree)
    {
        $manager->newUser($name, $password);
        header("Location: ../succesfulRegisteredPage.html");
    }

    else 
    {
        header("Location: ../login.html");
    }
}

elseif ($_SERVER["REQUEST_METHOD"]=="GET")
{
    $registeredUsers = $manager->getUserlist();
    $msg = "";

    $input = $_GET["input"];                

    foreach ($registeredUsers as $user)
    {
        if ($user["username"] == $input)
            $msg = "Der Name ist bereits vergeben!";                               
    }

    echo $msg;
}
?>
