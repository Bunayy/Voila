<?php

$manager = new DBManager();
$albums;
$msg="";

if($_SERVER["REQUEST_METHOD"]=="GET")
{
    if($_GET["session"]=="set")
    {
        $albums = $manager->getAlbumListOfOneAuthor ($_SESSION["username"]);
        for($i = 0; i < $albums.length; $i++)
            $msg = $msg . $albums . ";";
        
        echo $msg;
    }
}
?>