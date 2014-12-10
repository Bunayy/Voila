<?php
include './mongoDB.php';

if($_SERVER["REQUEST_METHOD"]=="POST")
{   
    session_start();
    
    $manager = new DBManager();
    if(isset($_SESSION["album"]))
        $answer = $manager->setAlbum ($_SESSION["album"], $_POST["albumTitle"], $_POST["albumText"], $_SESSION["username"]);
    else
        $answer = $manager->setAlbum ("", $_POST["albumTitle"], $_POST["albumText"], $_SESSION["username"]);
}

?>