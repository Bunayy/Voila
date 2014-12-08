<?php
session_start();
include './phpFunctions.php';
include './mongoDB.php';

if($_SERVER["REQUEST_METHOD"]=="GET")
{
    $manager = new DBManager();
    $message="";
    $albums = $manager->getAlbumListOfOneAuthor($_SESSION["username"]);
    
    foreach ($albums as $album) {
        $message = $message . $album . ";";
    }
    echo $message;
}
?>