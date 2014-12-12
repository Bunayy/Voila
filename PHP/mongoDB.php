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
    
    function getPhotoInfo($user, $albumname, $photo)
    {
        $files = DBManager::$db->fs->files;
        $file = $files->findOne(array('username' => $user, 'album' => $albumname, 'filename' => $photo));
        
        return $file['phototext'];
    }
            
    function addPhoto($user, $albumname, $photo, $phototext)
    {
        $wantedAlbum = DBManager::$albums->findOne(array("username" => $user, "title" => $albumname));
        $photoArray = $wantedAlbum["photos"];
        
        for ($index = 0; $index < count($photoArray); $index++)
        {
            if($photoArray[$index] == $photo["photo"]["name"])
                return "Sie haben bereits ein Foto in diesem Album mit diesem Namen!";
        }
        
        array_push($photoArray, $photo["photo"]["name"]);
        $album = DBManager::$albums->findAndModify(
                        array('title' => $albumname, 'username' => $user),
                        array('$set' => array('photos' => $photoArray)),
                        array(),
                        array('new' => true)
                    );
        
        DBManager::$gridFS->storeUpload('photo', array('phototext' => $phototext, 'username' => $user, 'album' => $albumname));
        
        return true;
    }
    
    function editPhoto($user, $albumname, $oldname, $newname, $phototext)
    {
        $wantedAlbum = DBManager::$albums->findOne(array("username" => $user, "title" => $albumname));
        $photoArray = $wantedAlbum["photos"];
        
        for($i = 0; $i< count($photoArray); $i++)
        {
            if($photoArray[$i] == $oldname)
            {
                $photoArray[$i] = $newname;
            }
        }
        $album = DBManager::$albums->findAndModify(
                    array('title' => $albumname, 'username' => $user),
                    array('$set' => array('photos' => $photoArray)),
                    array(),
                    array('new' => true)
                );
        $photo = DBManager::$gridFS->findAndModify(
                    array('filename' => $oldname, 'username' => $user, 'album' => $albumname),
                    array('$set' => array('filename' => $newname, 'phototext' => $phototext)),
                    array(),
                    array('new' => true)
                );
        return $this->getPhotoInfo($user, $albumname, $newname);
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
            $doc = array("title" => $newName, "username" => $user, "text" => $text, "photos" => array(), "publish" => 'false', "template" => 'template1');
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
    
    function getPhotoNames($user, $album)
    {
        $wantedAlbum = DBManager::$albums->findOne(array("username" => $user, "title" => $album));
        $photoArray = $wantedAlbum["photos"];
        return $photoArray;
    }
    
    function deleteUser($data)
    {
        DBManager::$users->remove(array('username' => $data), array("justOne" => true));
    }
}
?>