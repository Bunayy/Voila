function AjaxManager() 
{
    this.xmlhttp = new XMLHttpRequest();
}

AjaxManager.prototype.identify = function()
{
    var scope = this;
    
    this.xmlhttp.open("GET", "/Voila/PHP/authorDBManager.php", true);
     
    this.xmlhttp.onreadystatechange = function()
    {
       scope.receiveIdentity();
    };
    
    this.xmlhttp.send();
}

AjaxManager.prototype.receiveIdentity = function()
{
    if(this.xmlhttp.readyState == 4 && this.xmlhttp.status == 200)
    {
        var albumTitles = this.xmlhttp.responseText.split(";");
        var contentDiv = $("content_div");
        
        var editClass;
        var delClass;
        
        for(i = 0; i < albumTitles.length - 1; i++)
        {
            var list = document.createElement("LI");
            var span = document.createElement("SPAN");
            
            var edit = $("edit");
            var del = $("delete");
            
            span.innerHTML = albumTitles[i];
            list.appendChild(span);
            list.addEventListener("click", albumHandler);
            
            list.setAttribute("class", "edit");          
            edit.appendChild(list.cloneNode(true));
            
            list.removeAttribute("class");
            list.setAttribute("class", "del");
            del.appendChild(list.cloneNode(true));
            
            if(contentDiv !== null)
            {
                var div = document.createElement("DIV");
                var icon = document.createElement("IMG");
                var title = document.createElement("H3");

                div.setAttribute("class", "photoalbum");
                icon.setAttribute("class", "photoalbum");
                title.setAttribute("class", "photoalbum");

                icon.setAttribute("src", "/Voila/Images/fotoalbum_icon.gif")
                title.innerHTML = albumTitles[i];

                div.appendChild(icon);
                div.appendChild(title);
                contentDiv.appendChild(div);
            }
        }
        editClass = document.getElementsByClassName("edit");
        delClass = document.getElementsByClassName("del");
        for (i = 0; i < editClass.length; i++)
            editClass[i].addEventListener("click", albumHandler);
        for (i = 0; i < delClass.length; i++)
            delClass[i].addEventListener("click", albumHandler);
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

    this.xmlhttp.onreadystatechange = function()
    {
       scope.receiveAvailabilityStatus();
    };
    
    this.xmlhttp.send();
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

AjaxManager.prototype.setAlbum = function (formdata)
{
    var scope = this;
    
    this.xmlhttp.open("POST", "/Voila/PHP/editorHandler.php", true);
      
    this.xmlhttp.onreadystatechange = function()
    {
       scope.getCreatedAlbum();
    };
    
    this.xmlhttp.send(formdata);
}

AjaxManager.prototype.getCreatedAlbum = function ()
{
    if(this.xmlhttp.readyState == 4 && this.xmlhttp.status == 200)
    {
        
    }
}