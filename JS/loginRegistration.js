window.addEventListener("beforeunload", storeName, false);
//window.addEventListener("load", forwardAuthor(), false);
var xmlhttp = initXmlHttpRequestObj();

function initLoginHTML()
{
    restoreName();
    
    if ($("userInput").value !== "")
    {
        checkForAvailability($("userInput").value);
        
    }
}

function forwardAuthor()
{
    
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
    }
    return "";
}

function checkForAvailability(str)
{
    
    if(str.length == 0)
    {
        $("availabilityInfo").innerHTML = "";
        return;
    }
    
    xmlhttp.open("GET", "/Voila/PHP/registrationHandler.php?input=" + str, true);
     
    xmlhttp.send();
    
    xmlhttp.onreadystatechange = responseHandler;
}

function responseHandler()
{
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200)
    {
        var inf = $("availabilityInfo");
        inf.innerHTML = xmlhttp.responseText;
        
        if(xmlhttp.responseText != "")
            $("registerButton").setAttribute("disabled", "disabled");
        else
            $("registerButton").removeAttribute("disabled");
    }
}