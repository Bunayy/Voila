var xmlhttpIdentifier = initXmlHttpRequestObj();

function identify()
{
    xmlhttpIdentifier.open("GET", "/Voila/PHP/registrationHandler.php?session=set", true);
     
    xmlhttpIdentifier.send();
    
    xmlhttpIdentifier.onreadystatechange = receiveIdentity();
}

function receiveIdentity()
{
     if(xmlhttpIdentifier.readyState == 4 && xmlhttpIdentifier.status == 200)
    {
        var albumTitles = xmlhttpIdentifier.responseText.split(";");
        var contentDiv = $("content_div");
        
        for(i = 0; i < albumTitles.length; i++)
        {
            var div = document.createElement("DIV");
            var icon = document.createElement("IMG");
            var title = document.createElement("H3");
            
            div.setAttribute("class", "photoalbum");
            icon.setAttribute("class", "photoalbum");
            title.setAttribute("class", "photoalbum");
            
            icon.setAttribute("src", "../Images/fotoalbum_icon.gif")
            title.innerHTML = albumTitles[i];
            
            div.appendChild(icon);
            div.appendChild(title);
            contentDiv.appendChild(div);
        }
        
        if(xmlhttpIdentifier.responseText != "")
            $("registerButton").setAttribute("disabled", "disabled");
        else
            $("registerButton").removeAttribute("disabled");
    }
}