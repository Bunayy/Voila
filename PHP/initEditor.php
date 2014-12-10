<?php
if($_SERVER["REQUEST_METHOD"]=="GET")
{   
    session_start();
    unset($_SESSION["album"]);
    
    if(isset($_GET["album"]))
    {
        $_SESSION["album"] = $_GET["album"];
    }
}
header("Location: ../editor.html");
?>
