var ajaxManObj = new AjaxManager();
window.addEventListener("click", mouseClickHandler, false);
window.addEventListener("resize", resizeHandler, false);

var submitButton;

function initEditorPage()
{
    ajaxManObj.getAlbumInfos();
    
    var albumForm = $("albumForm");
    var fotoForm = $("fotoForm");
    var publishForm = $("publishForm");
    var fotoFormInvisible = $("fotoFormInvisible");
    
    albumForm.addEventListener("submit", submitAlbumHandler);
    fotoForm.addEventListener("submit", submitFotoHandler);
    publishForm.addEventListener("submit", submitPublishHandler);
    fotoFormInvisible.addEventListener("submit", submitFotoHandlerInvisible);
    
    resizeHandler();
}

function resizeHandler()
{
    var invisibleDiv = $("fotoDivInvisible");
    var displayWidth = window.innerWidth;
    var displayHeight = window.innerHeight;
    var pointX = (displayWidth/2) - (invisibleDiv.offsetWidth/2);
    var pointY = (displayHeight/2) - (invisibleDiv.offsetHeight/2);
    
    invisibleDiv.style.left = pointX + "px";
    invisibleDiv.style.top = pointY + "px";
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
    
    var fotoTitle = $("fotoTitle").value;
    var fotoText = $("fotoText").value;
    var fileInput = $("fileUpload");
    
    var file = fileInput.files[0];
    if(file != null)
    {
        var formData = new FormData();

        formData.append("fotoText", fotoText);
        formData.append('photo', file, fotoTitle);

        ajaxManObj.setPhoto(formData);
    }
    else
        alert("Bitte wählen Sie ein Bild aus!")
}

function submitPublishHandler(e)
{
    e.preventDefault();
    submitButton = $("publishSubmit");
    submitButton.innerHTML = "Uploading...";
}

function submitFotoHandlerInvisible(e)
{
    e.preventDefault();
    
    var newTitle = $("fotoTitleInvisible").value;
    var fotoText = $("fotoTextInvisible").value;
    var oldTitle = $("legend").innerHTML;
    
    ajaxManObj.editPhoto(newTitle, oldTitle, fotoText);
}

function editPhoto(e)
{
    var invisibleDiv = $("fotoDivInvisible");
    invisibleDiv.setAttribute("class", "visible");
    
    var photoName = e.currentTarget.id;
    $("legend").innerHTML = photoName;
    $("fotoTitleInvisible").value = photoName;
    
    ajaxManObj.getPhotoInfos(photoName);  
}

function home()
{
    window.location = "/Voila/authorIndex.html";
}

function changePW()
{
    
}

function mouseClickHandler(e)
{
    var srcClass = e.target.className;
    var invisibleDiv = $("fotoDivInvisible");
    
    if(srcClass == "photo" && invisibleDiv.getAttribute("class") == "hide invisible")
    {
        invisibleDiv.setAttribute("class", "hide visible");
        var photoName = e.target.id;
        $("legend").innerHTML = photoName;
        $("fotoTitleInvisible").value = photoName;
    
    ajaxManObj.getPhotoInfos(photoName);
    }
    else if(srcClass.substring(0,4) != "hide" && invisibleDiv.getAttribute("class") == "hide visible")
        invisibleDiv.setAttribute("class", "hide invisible");
}