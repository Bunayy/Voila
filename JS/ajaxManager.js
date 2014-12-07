function AjaxManager() 
{
    this.xmlhttp = new XMLHttpRequest();
}

AjaxManager.prototype.identify = function()
{
    this.xmlhttp.open("GET", "/Voila/PHP/registrationHandler.php?session=set", true);
     
    this.xmlhttp.send();
    
    this.xmlhttp.onreadystatechange = this.receiveIdentity();
}

AjaxManager.prototype.receiveIdentity = function()
{
    if(this.xmlhttp.readyState == 4 && this.xmlhttp.status == 200)
    {
        var albumTitles = this.xmlhttp.responseText.split(";");
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
        
        if(this.xmlhttp.responseText != "")
            $("registerButton").setAttribute("disabled", "disabled");
        else
            $("registerButton").removeAttribute("disabled");
    }
}

AjaxManager.prototype.checkForAvailability = function(str)
{
    if(str.length == 0)
    {
        $("availabilityInfo").innerHTML = "";
        return;
    }
    
    this.xmlhttp.open("GET", "/Voila/PHP/registrationHandler.php?input=" + str, true);
     
    this.xmlhttp.send();
    
    this.xmlhttp.onreadystatechange = this.receiveAvailabilityStatus;
}

AjaxManager.prototype.receiveAvailabilityStatus = function ()
{
    if(this.xmlhttp.readyState == 4 && this.xmlhttp.status == 200)
    {
        var inf = $("availabilityInfo");
        inf.innerHTML = this.xmlhttp.responseText;
        
        if(this.xmlhttp.responseText != "")
            $("registerButton").setAttribute("disabled", "disabled");
        else
            $("registerButton").removeAttribute("disabled");
    }
}