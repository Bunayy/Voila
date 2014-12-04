var xmlhttp = initXmlHttpRequestObj();

function checkForAvailability(str){
    
    if(str.length == 0)
    {
        document.getElementById("availabilityInfo").innerHTML = "";
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
        var inf = document.getElementById("availabilityInfo");
        inf.innerHTML = xmlhttp.responseText;
        
        if(xmlhttp.responseText != "")
            document.getElementById("registerButton").setAttribute("disabled", "disabled");
        else
            document.getElementById("registerButton").removeAttribute("disabled");
    }
}