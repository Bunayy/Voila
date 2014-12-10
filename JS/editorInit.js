var ajaxManObj = new AjaxManager();
window.addEventListener("load", initEditorPage(), false);

function initEditorPage()
{
    ajaxManObj.identify();
}

function logout()
{
    window.location = "/Voila/PHP/logoutHandler.php"
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