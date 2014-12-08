function AjaxManager() 
{
    this.xmlhttp = new XMLHttpRequest();
}

AjaxManager.prototype.identify = function()
{
    var scope = this;
    
    this.xmlhttp.open("GET", "/Voila/PHP/authorDBManager.php", true);
     
    this.xmlhttp.send();
    
    this.xmlhttp.onreadystatechange = function()
    {
       scope.receiveIdentity();
    };
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
    }
}

AjaxManager.prototype.checkForAvailability = function(str)
{
    var scope = this;
    if(str.length == 0)
    {
        $("availabilityInfo").innerHTML = "";
        return;
    }
    
    this.xmlhttp.open("GET", "/Voila/PHP/registrationHandler.php?input=" + str, true);
     
    this.xmlhttp.send();
    
    this.xmlhttp.onreadystatechange = function()
    {
       scope.receiveAvailabilityStatus();
    };
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