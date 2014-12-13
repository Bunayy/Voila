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
        while(contentDiv.hasChildNodes())
        {
            contentDiv.removeChild(contentDiv.firstChild);
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
        {
            $("registerButton").setAttribute("disabled", "disabled");
            $("loginButton").removeAttribute("disabled");
        }
        else
        {
            $("registerButton").removeAttribute("disabled");
            $("loginButton").setAttribute("disabled", "disabled");
        }
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
        $("albumSubmit").value = "Ändern";
        
        if(this.xmlhttp.responseText == msg)
        {
            alert(msg);
        }
        else
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
    }
}

AjaxManager.prototype.getAlbumInfos = function ()
{
    var scope = this;
    
    this.xmlhttp.open("GET", "/Voila/PHP/editorHandler.php?request=album", true);
      
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
        var msg = this.xmlhttp.responseText.split(";");
        $("albumTitle").value = msg[0];
        $("albumText").value = msg[1];
        
        if(msg[2] != "false")
            $("publishInput").checked = true;
        else
            $("publishInput").checked = false;
        
        if(msg[3] != "Template2")
            $("templateChoice").selectedIndex = 0;
        else
            $("templateChoice").selectedIndex = 1;

        if(msg[0] != "")
            this.getPhotos();
        else
            this.identify();
    }
}

AjaxManager.prototype.getPhotoInfos = function (name)
{
    var scope = this;
    
    this.xmlhttp.open("GET", "/Voila/PHP/editorHandler.php?request=photoInfo&name=" + name, true);
      
    this.xmlhttp.onreadystatechange = function()
    {
       scope.receivePhotoInfos();
    };
    
    this.xmlhttp.send();
}

AjaxManager.prototype.receivePhotoInfos = function ()
{
    if(this.xmlhttp.readyState == 4 && this.xmlhttp.status == 200)
    {
        var msg = this.xmlhttp.responseText;
        $("fotoTextInvisible").value = msg;
        
        this.getPhotos();
    }
}

AjaxManager.prototype.setPhoto = function (formdata)
{
    var scope = this;
    
    this.xmlhttp.open("POST", "/Voila/PHP/photoUploadHandler.php", true);
      
    this.xmlhttp.onreadystatechange = function()
    {
       scope.receivePhotoResponse();
    };
    
    this.xmlhttp.send(formdata);
}

AjaxManager.prototype.receivePhotoResponse = function ()
{
    if(this.xmlhttp.readyState == 4 && this.xmlhttp.status == 200)
    {
        var msg = this.xmlhttp.responseText;
        submitButton.innerHTML = "Upload";
        
        if(msg == "1")
        {
            $("fotoTitle").value = "";
            $("fotoText").value = "";
            var fileInput = $("fileUpload");
            for(i = 0; i < fileInput.files.length; i++)
                fileInput.files[i] = null;
            
            this.getPhotos();
        }
        else
            alert(msg);
    }
}

AjaxManager.prototype.getPhotos = function ()
{
    var scope = this;
    
    this.xmlhttp.open("GET", "/Voila/PHP/editorHandler.php?request=addingPhoto", true);
      
    this.xmlhttp.onreadystatechange = function()
    {
       scope.receivePhotos();
    };
    
    this.xmlhttp.send();
}

AjaxManager.prototype.receivePhotos = function ()
{
    if(this.xmlhttp.readyState == 4 && this.xmlhttp.status == 200)
    {
        if(this.xmlhttp.responseText != "")
        {
            var msg = this.xmlhttp.responseText.split(";");
            
            while($("fotoList").hasChildNodes())
            {
                $("fotoList").removeChild($("fotoList").firstChild);
            }

            for(i = 0; i < msg.length; i++)
            {
                var photo = document.createElement("P");
                photo.setAttribute("class", "photo");
                photo.setAttribute("id", msg[i]);
                photo.innerHTML = msg[i];
                $("fotoList").appendChild(photo);
            }
        }
  
        this.identify();
    }
}

AjaxManager.prototype.editPhoto = function (newTitle, oldTitle, photoText)
{
    var scope = this;
    
    this.xmlhttp.open("GET", "/Voila/PHP/editorHandler.php?request=editingPhoto&oldname="
            + oldTitle + "&newname=" + newTitle + "&phototext=" + photoText, true);
      
    this.xmlhttp.onreadystatechange = function()
    {
       scope.receivePhotoEditAnswer();
    };
    
    this.xmlhttp.send();
}

AjaxManager.prototype.receivePhotoEditAnswer = function ()
{
    if(this.xmlhttp.readyState == 4 && this.xmlhttp.status == 200)
    {
        submitButton = $("fileSubmitInvisible");
        submitButton.innerHTML = "Ändern";
        
        $("legend").innerHTML = $("fotoTitleInvisible").value;
        $("fotoTextInvisible").value = this.xmlhttp.responseText;
        this.getPhotos();
    }
}

AjaxManager.prototype.setPublish = function (publish, template)
{
    var scope = this;
    
    this.xmlhttp.open("GET", "/Voila/PHP/editorHandler.php?request=publish&publish="
            + publish + "&template=" + template, true);
      
    this.xmlhttp.onreadystatechange = function()
    {
       scope.receivePublishAnswer();
    };
    
    this.xmlhttp.send();
}

AjaxManager.prototype.receivePublishAnswer = function ()
{
    if(this.xmlhttp.readyState == 4 && this.xmlhttp.status == 200)
    {
        submitButton = $("publishSubmit");
        submitButton.innerHTML = "Ändern";
    
        if(this.xmlhttp.responseText == "false")
            alert("Es ist ein Fehler beim ändern der Einstellungen aufgetreten");
    }
}

AjaxManager.prototype.editPW = function (formdata)
{
    var scope = this;
    
    this.xmlhttp.open("POST", "/Voila/PHP/authorDBManager.php", true);
      
    this.xmlhttp.onreadystatechange = function()
    {
       scope.receivePWAnswer();
    };
    
    this.xmlhttp.send(formdata);
}

AjaxManager.prototype.receivePWAnswer = function ()
{
    if(this.xmlhttp.readyState == 4 && this.xmlhttp.status == 200)
    {
        var infoBox = $("pwInfo");
        
        if(this.xmlhttp.responseText == "true")
        {
            infoBox.innerHTML = "Das Passwort wurde erfolgreich geändert!";
        }
            
        else if(this.xmlhttp.responseText == "false")
        {
            infoBox.innerHTML = "Es ist ein Fehler aufgetreten. Das Passwort konnte nicht geändert werden!";
        }
        
        else if(this.xmlhttp.responseText == "missmatch")
        {
            infoBox.innerHTML = "Ihre Eingabe des alten Passworts war nicht korrekt!";
        }
        
        $("pwOldInvisible").value = "";
        $("pwNewInvisible").value = "";
        $("pwSubmitInvisible").value = "Ändern";
    }
}

AjaxManager.prototype.deleteAlbum = function (albumName)
{
    var scope = this;
    
    this.xmlhttp.open("GET", "/Voila/PHP/authorDBManager.php?request=delete&album="
            + albumName, true);
      
    this.xmlhttp.onreadystatechange = function()
    {
       scope.receiveDeleteAnswer();
    };
    
    this.xmlhttp.send();
}

AjaxManager.prototype.receiveDeleteAnswer = function ()
{
    if(this.xmlhttp.readyState == 4 && this.xmlhttp.status == 200)
    {
        this.identify();
        alert("Das Album wurde entfernt");
    }
}