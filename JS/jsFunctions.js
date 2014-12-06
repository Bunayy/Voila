//Erzeugung des XML HTTP Request Objekts
function initXmlHttpRequestObj()
{
    var obj = null;
    
    obj = new XMLHttpRequest();
    
    return obj;
}

//Hilfsfunktion für document.getElementById()
function $(id)
{
    return document.getElementById(id);
}

//Schreibt den eingegebenen Usernamen in den Localstorage
function storeName()
{
    if($("userInput").value !== "")
        sessionStorage.setItem('username', $("userInput").value);
}

//Guckt, ob ein Username im Localstorage angelegt ist und lädt diesen
function restoreName()
{
    if(sessionStorage.username != undefined)
        $("userInput").value = sessionStorage.username;
}

//Funktion zur Weiterleitung auf die Login-Seite
function forwardToLogin()
{
    setTimeout(function () {window.location="login.html";}, 3000);
}


