window.addEventListener("beforeunload", storeName, false);
window.addEventListener("load", restoreName, false);
var xmlhttp = initXmlHttpRequestObj();

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