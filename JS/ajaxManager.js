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
        
        var edit = $("edit");
        var del = $("delete");
        
        while(edit.hasChildNodes())
        {
            edit.removeChild(edit.firstChild);
            del.removeChild(del.firstChild);
        }
        
        for(i = 0; i < albumTitles.length - 1; i++)
        {
            var list = document.createElement("LI");
            var span = document.createElement("SPAN");
           
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
        var msg = "Sie haben bereits ein Album mit diesem Namen!";
        $("albumSubmit").value = "Bestätigen";
        if(this.xmlhttp.responseText != msg)
        {
            msg = this.xmlhttp.responseText.split(";");
            $("albumTitle").value = msg[1];
            $("albumText").value = msg[2];
            if(msg[0] == "false")
            {
                alert("Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut!")
            }
            this.identify();
        }
        else
        {
            alert(msg);
        }
        
    }
}

AjaxManager.prototype.getAlbumInfos = function ()
{
    var scope = this;
    
    this.xmlhttp.open("GET", "/Voila/PHP/editorHandler.php", true);
      
    this.xmlhttp.onreadystatechange = function()
    {
       scope.receiveAlbumInfos();
    };
    
    this.xmlhttp.send();
}

AjaxManager.prototype.receiveAlbumInfos = function ()
{
    if(this.xmlhttp.readyState == 4 && this.xmlhttp.status == 200)
    {
        msg = this.xmlhttp.responseText.split(";");
        $("albumTitle").value = msg[0];
        $("albumText").value = msg[1];
        
        this.identify();
    }
}