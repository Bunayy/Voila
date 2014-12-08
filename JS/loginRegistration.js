window.addEventListener("beforeunload", storeName, false);
var ajaxManagerObj = new AjaxManager();

function initLoginHTML()
{
    if(checkCookie("PHPSESSID"))
    {
        window.location = "/Voila/authorIndex.html";
    }
    else
    {
        restoreName();

        if ($("userInput").value !== "")
        {
            ajaxManagerObj.checkForAvailability($("userInput").value);       
        }
    }
}

function onInputHandler(str)
{
    ajaxManagerObj.checkForAvailability(str);
}