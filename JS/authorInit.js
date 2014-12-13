var ajaxManObj = new AjaxManager();
window.addEventListener("load", initAuthorPage, false);
window.addEventListener("click", mouseClickHandler, false);
window.addEventListener("resize", resizeHandler, false);

function initAuthorPage()
{
    ajaxManObj.identify();
    resizeHandler();
    
    var pwFormInvisible = $("pwFormInvisible");
    pwFormInvisible.addEventListener("submit", submitPWHandlerInvisible);
}

function resizeHandler()
{
    var invisibleDivPW = $("pwDivInvisible");
    
    var displayWidth = window.innerWidth;
    var displayHeight = window.innerHeight;
    var pointX = (displayWidth/2) - (invisibleDivPW.offsetWidth/2);
    var pointY = (displayHeight/2) - (invisibleDivPW.offsetHeight/2);

    invisibleDivPW.style.left = pointX + "px";
    invisibleDivPW.style.top = pointY + "px";
}

function logout()
{
    window.location = "/Voila/PHP/logoutHandler.php";
}

function createAlbum()
{
    window.location = "/Voila/PHP/initEditor.php";
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
        ajaxManObj.deleteAlbum(src.innerHTML);
    }
}

function home()
{
    window.location = "/Voila/authorIndex.html";
}

function mouseClickHandler(e)
{
    var srcClass = e.target.className;
    var invisibleDivPW = $("pwDivInvisible");
    var oldPW = $("pwOldInvisible");
    var newPW = $("pwNewInvisible");
    var infoBox = $("pwInfo");
    
    if(srcClass == "direct pwChanger" && invisibleDivPW.getAttribute("class") == "hide invisible")
    {
        infoBox.innerHTML = "";
        oldPW.value = "";
        newPW.value = "";
        invisibleDivPW.setAttribute("class", "hide visible");
    }
    
    else if(srcClass.substring(0,4) != "hide" && invisibleDivPW.getAttribute("class") == "hide visible")
    {
        invisibleDivPW.setAttribute("class", "hide invisible");     
    }
}

function submitPWHandlerInvisible(e)
{
    e.preventDefault();
    
    var oldPW = $("pwOldInvisible");
    var newPW = $("pwNewInvisible");
    var formdata = new FormData();
    var infoBox = $("pwInfo");
    
    if(oldPW.value == "" || newPW.value == "")
    {
        infoBox.innerHTML = "Sie müssen beide Felder ausfüllen!";
    }
    else if(oldPW.value == newPW.value)
    {
        infoBox.innerHTML = "Das neue Passwort muss sich vom alten unterscheiden!";
        $("pwNewInvisible").value = "";
    }
    else
    {
        infoBox.innerHTML = "Passwort wird geändert!";
        $("pwSubmitInvisible").value = "Updating...";
        formdata.append("oldPW", oldPW.value);
        formdata.append("newPW", newPW.value);
        ajaxManObj.editPW(formdata);
    }
}

////////////////////////////////////
//Handler zum Betrachten von Alben//
////////////////////////////////////