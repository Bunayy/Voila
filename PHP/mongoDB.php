<?php
class DBManager
{
    private static $connection;
    private static $db;
    private static $users;
    private static $albums;
    private static $gridFS;
    
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
        DBManager::$gridFS = DBManager::$db->getGridFS();
    }

    function testUsernameAvailable($name) 
    {
        $user = DBManager::$users->findOne(array('username' => $name));
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
        if ($pWord['password'] == $pw)
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
        $doc = array("username" => $user, "password" => $password, "albums" => array());
        DBManager::$users->insert($doc);
    }

    function getUserlist()
    {
        $userlist = DBManager::$users->find();
        return $userlist;
    }
    
    function setAlbumListOfOneAuthor($name, $array)
    {
        $album = DBManager::$users->findAndModify(
                        array('username' => $name),
                        array('$set' => array('albums' => $array)),
                        array(),
                        array('new' => true)
                    );
    }
    
    function testAlbumNameAvailable($user, $album)
    {
        $albumList = $this->getAlbumListOfOneAuthor($user);
        for($i = 0; $i< count($albumList); $i++)
        {
            if($albumList[$i] == $album)
            {
                return false;
            }
        }
        return true;
    }
            
    function getAlbumListOfOneAuthor($name)
    {
        $albumArray = DBManager::$users->findOne(array('username' => $name), array('albums'));
        return $albumArray['albums'];
    }
    
    function getCompleteAlbumList()
    {
        
    }
    
    function getAlbumInformation($user, $albumTitle)
    {
        $album = DBManager::$albums->findOne(array('title' => $albumTitle, 'username' => $user));
        return $album;
    }
    
    function setAlbum($oldname, $newName, $text, $user)
    {
        $albumList = $this->getAlbumListOfOneAuthor($user);
        
        if($oldname == "")
        {
            $doc = array("title" => $newName, "username" => $user, "text" => $text, "fotos" => array());
            DBManager::$albums->insert($doc);
            
            $album = DBManager::$albums->findOne(array('title' => $newName, 'username' => $user));
            
            array_push($albumList, $newName);              
        }
        else
        {
            $album = DBManager::$albums->findAndModify(
                        array('title' => $oldname, 'username' => $user),
                        array('$set' => array('title' => $newName, "text" => $text)),
                        array(),
                        array('new' => true)
                    );
            for($i = 0; $i< count($albumList); $i++)
            {
                if($albumList[$i] == $oldname)
                    $albumList[$i] = $newName;
            }
        }
        
        $this->setAlbumListOfOneAuthor($user, $albumList); 
        
        if ($album['title'] == $newName)
            {
                return true;
            }
            else
            {
                return false;
            }  
    }
    
    function getAlbum($albumName)
    {
        
    }
    
    function deleteUser($data)
    {
        DBManager::$users->remove(array('username' => $data), array("justOne" => true));
    }
}
?>