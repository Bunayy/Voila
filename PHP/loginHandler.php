<?php
include './phpFunctions.php';
include './mongoDB.php';

$name = "";
$password = "";

if($_SERVER["REQUEST_METHOD"]=="POST")
{
    $manager = new DBManager();
    
    $name = testInput($_POST["username"]);
    $password = testInput($_POST["password"]);
    
    $verified = $manager->login($name, $password);
    
    if($verified)
    {
        header('Location: ../authorIndex.html');
    }
    else
    {
        echo "<script type='text/javascript'>alert('Der Username stimmt nicht mit dem Passwort ueberein!');"
        . "window.location='../login.html';</script>";
    }
}

?>