<?php
include './phpFunctions.php';
include './mongoDB.php';

$albums;
$msg="";

if($_SERVER["REQUEST_METHOD"]=="GET")
{
    $manager = new DBManager();
    
    $albums = $manager->getAlbumListOfOneAuthor ($_SESSION["username"]);
    
    for($i = 0; i < $albums.length; $i++)
        $msg = $msg . $albums . ";";
    echo $msg;
}
?>