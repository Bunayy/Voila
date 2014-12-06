<?php
class DBManager
{
    private static $connection;
    private static $db;
    private static $users;
    private static $albums;

    function __construct()
    {
        if (DBManager::$connection == null)
        {
            $this->initDB();
        }
    }

    function initDB()
    {
        DBManager::$connection = new Mongo();
        DBManager::$db = DBManager::$connection->selectDB('SPak530363_Voila_DB');
        DBManager::$users = DBManager::$db->selectCollection('registeredUsers');
        DBManager::$albums = DBManager::$db->selectCollection('photoAlbums');
    }

    function testUsernameAvailable($data) 
    {
        $user = DBManager::$users->findOne(array('username' => $data));
        if ($user == null) 
        {
            return true;
        } 
        else 
        {
            return false;
        }
    }

    function login($name, $pw)
    {
        $pWord = DBManager::$users->findOne(array('username' => $name), array('password'));
        if ($pWord === $pw)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    
    function newUser($user, $password)
    {
        $doc = array("username" => $user, "password" => $password);
        DBManager::$users->insert($doc);
    }

    function getUserlist()
    {
        $userlist = DBManager::$users->find();
        return $userlist;
    }

    function deleteUser($data)
    {
        DBManager::$users->remove(array('username' => $data), array("justOne" => true));
    }
}
?>