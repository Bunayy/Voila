var ajaxManObj = new AjaxManager();
var submitButton;

function initEditorPage()
{
    ajaxManObj.getAlbumInfos();
    
    var albumForm = $("albumForm");
    var fotoForm = $("fotoForm");
    var publishForm = $("publishForm");
    
    albumForm.addEventListener("submit", submitAlbumHandler);
    fotoForm.addEventListener("submit", submitFotoHandler);
    publishForm.addEventListener("submit", submitPublishHandler);
}

function logout()
{
    window.location = "/Voila/PHP/logoutHandler.php"
}

function createAlbum()
{
    window.location = "/Voila/PHP/initEditor.php"
}

function albumHandler(e)
{
    var src = e.target;
    var srcClass = src.parentNode.getAttribute("class");
    if(srcClass == "edit"){
        //Weiterleitung zum Editor um entsprechendes Album zu bearbeiten
        //einen Session Cookie mit "Album" => src.innerHTML
        //darüber Album Daten aus der DB laden
        window.location = "/Voila/PHP/initEditor.php?album=" + src.innerHTML;
    }
    else if (srcClass == "del")
    {
        //Entfernen des Albums aus der DB und anschließend Weiterleitung
        //auf authorIndex.html 
    }
}

function submitAlbumHandler(e)
{
    e.preventDefault();
    
    submitButton = $("albumSubmit");
    submitButton.value = "Uploading...";
    
    var albumTitle = $("albumTitle").value;
    var albumText = $("albumText").value;
    
    var formData = new FormData();
    
    formData.append("albumTitle", albumTitle);
    formData.append("albumText", albumText);
    
    ajaxManObj.setAlbum(formData); 
}

function submitFotoHandler(e)
{
    e.preventDefault();
    submitButton = $("fileSubmit");
    submitButton.innerHTML = "Uploading...";
}

function submitPublishHandler(e)
{
    e.preventDefault();
    submitButton = $("publishSubmit");
    submitButton.innerHTML = "Uploading...";
}