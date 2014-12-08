var ajaxManObj = new AjaxManager();
window.addEventListener("load", initAuthorPage(), false);

function initAuthorPage()
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
    }
    else if (srcClass == "del")
    {
        //Entfernen des Albums aus der DB und anschließend Weiterleitung
        //auf authorIndex.html 
    }
}
////////////////////////////////////
//Handler zum Erstellen von Alben///
////////////////////////////////////
////////////////////////////////////
//Handler zum Betrachten von Alben//
////////////////////////////////////