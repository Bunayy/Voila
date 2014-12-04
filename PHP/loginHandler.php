<?php
    include './phpFunctions.php';
    include './mongoDB.php';

    $name=$password="";

    if($_SERVER["REQUEST_METHOD"]=="POST")
    {
        $manager = new DBManager();

        $name = testInput($_POST["username"]);
        $password = testInput($_POST["password"]);
        

        $nameFree = $manager->testUsernameAvailable($name);

        if ($nameFree)
        {
            $manager->newUser($name, $password);
            echo "<p>Sie haben sich erfolgreich mit dem Namen '$name' registriert</p>";
        }

        else 
        {
            echo "<p>Der User-Name ist bereits vergeben!</p>";
        }
    }
?>
