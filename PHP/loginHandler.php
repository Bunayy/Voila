<?php
include './phpFunctions.php';
include './mongoDB.php';

echo 'test';

$name=$password="";

if($_SERVER["REQUEST_METHOD"]=="POST")
{
    $manager = new DBManager();

    $name = testInput($_POST["username"]);
    $password = testInput($_POST["password"]);

    $verified = $manager->login($name, $password);

    if ($verified)
    {
        header("Location: ../authorIndex.html");
    }

    else 
    {
        echo "<p>Der Username stimmt nicht mit dem Passwort überein!</p>";
        header("Location: ../login.html");
    }
}
?>
