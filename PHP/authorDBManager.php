<?php
session_start();
include './phpFunctions.php';
include './mongoDB.php';

$manager = new DBManager();
$message="";

if($_SERVER["REQUEST_METHOD"]=="GET")
{
    if(isset($_GET["request"]))
    {
        if($_GET["request"] == "delete")
        {
            $infos = $manager->deleteAlbum($_SESSION["username"], $_GET["album"]);
        }
    }
    else
    {
        $albums = $manager->getAlbumListOfOneAuthor($_SESSION["username"]);

        foreach ($albums as $album) {
            $message = $message . $album . ";";
        }
        echo $message;
    }
}
else if($_SERVER["REQUEST_METHOD"]=="POST")
{
    $message = $manager->editPassword($_SESSION["username"], $_POST["oldPW"], $_POST["newPW"]);
    echo $message;
}
?>