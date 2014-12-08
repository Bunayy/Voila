var ajaxManObj = new AjaxManager();
window.addEventListener("load", initAuthorPage(), false);

function initAuthorPage()
{
    ajaxManObj.identify();
}

function logout()
{
    window.location = "/Voila/PHP/logoutHandler.php"
}