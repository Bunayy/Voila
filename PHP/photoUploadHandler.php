<?php
session_start();
include './mongoDB.php';

$manager = new DBManager();

if($_SERVER["REQUEST_METHOD"]=="POST")
{
    if(!isset($_SESSION["album"]))
    {
        echo 'Sie müssen zunächst ein Album erstellen oder eines bearbeiten, um'
        . ' ein Foto hochladen zu können!';
    }
    else
    {
        
        $msg = $manager->addPhoto($_SESSION["username"], $_SESSION["album"], $_FILES, $_POST["fotoText"]);
        echo $msg;
    }
}

?>