<?php
session_start();
include './mongoDB.php';

$manager = new DBManager();

if($_SERVER["REQUEST_METHOD"]=="POST")
{   
    $answer;
    if(!isset($_SESSION["album"]))
    {
        if($manager->testAlbumNameAvailable($_SESSION["username"], $_POST["albumTitle"]))
        {
            $answer = $manager->setAlbum ("", $_POST["albumTitle"], $_POST["albumText"], $_SESSION["username"]);
            $_SESSION["album"] = $_POST["albumTitle"];
            echo "true;" . $_POST["albumTitle"] . ";" . $_POST["albumText"];
        }
        else
        {
            echo 'Sie haben bereits ein Album mit diesem Namen!';
        }
    }
    else if(($manager->testAlbumNameAvailable($_SESSION["username"], $_POST["albumTitle"])) == true || ($_SESSION["album"] == $_POST["albumTitle"]))
    {
        if(isset($_SESSION["album"]))
            $answer = $manager->setAlbum ($_SESSION["album"], $_POST["albumTitle"], $_POST["albumText"], $_SESSION["username"]);
        else
        {
            $answer = $manager->setAlbum ("", $_POST["albumTitle"], $_POST["albumText"], $_SESSION["username"]);
        }

        if($answer == true)
        {
            $_SESSION["album"] = $_POST["albumTitle"];
            echo "true;" . $_POST["albumTitle"] . ";" . $_POST["albumText"];
        }
        else
        {
            echo "false;" . $_POST["albumTitle"] . ";" . $_POST["albumText"];
        }
    }
    else
    {
        echo 'Sie haben bereits ein Album mit diesem Namen!';
    }
}
elseif ($_SERVER["REQUEST_METHOD"]=="GET")
{
    if(isset($_SESSION["album"]))
    {
        if($_GET["request"] == "album")
        {
            $infos = $manager->getAlbumInformation($_SESSION["username"], $_SESSION["album"]);

            echo $infos["title"] . ";" . $infos["text"] . ";" . $infos["publish"] . ";" . $infos["template"];
        }
        else if($_GET["request"] == "addingPhoto")
        {
            $msg = "";
            $infos = $manager->getPhotoNames($_SESSION["username"], $_SESSION["album"]);
            
            for ($index = 0; $index < count($infos); $index++)
            {
                $msg = $msg . $infos[$index];
                if(($index+1) != count($infos))
                    $msg = $msg . ";";
            }
            echo $msg;
        }
        else if($_GET["request"] == "editingPhoto")
        {
            $infos = $manager->editPhoto($_SESSION["username"], $_SESSION["album"], $_GET["oldname"], $_GET["newname"], $_GET["phototext"]);
            echo $infos;
        }
        else if($_GET["request"] == "photoInfo")
        {
            $infos = $manager->getPhotoInfo($_SESSION["username"], $_SESSION["album"], $_GET["name"]);
            echo $infos;
        }
        else if($_GET["request"] == "publish")
        {
            $infos = $manager->setPublicity($_SESSION["username"], $_SESSION["album"], $_GET["publish"], $_GET["template"]);
            echo $infos;
        }
    }
    else
    {
        $publish = "false";
        $template = "Template1";
        echo ';;' . $publish . ';' . $template;
    }
}

?>