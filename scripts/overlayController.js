var overlay = document.getElementById('overlay');
var overlayClose = document.getElementById('overlayClose');

var home = document.getElementById('Home');
var kontakt = document.getElementById('Kontakt');
var datenschutz = document.getElementById('Datenschutz');

var menuItemHome = document.getElementById('menuItemHome');
var menuItemKontakt = document.getElementById('menuItemKontakt');
var menuItemDatenschutz = document.getElementById('menuItemDatenschutz');

overlayClose.onclick = function ()
{
    overlay.style.display = 'none';
    home.style.display = 'none';
    kontakt.style.display = 'none';
    datenschutz.style.display = 'none';
}

menuItemHome.onclick = function ()
{
    overlay.style.display = 'block';
    home.style.display = 'block';
    kontakt.style.display = 'none';
    datenschutz.style.display = 'none';
}

menuItemKontakt.onclick = function ()
{
    overlay.style.display = 'block';
    home.style.display = 'none';
    kontakt.style.display = 'block';
    datenschutz.style.display = 'none';
}

menuItemDatenschutz.onclick = function ()
{
    overlay.style.display = 'block';
    home.style.display = 'none';
    kontakt.style.display = 'none';
    datenschutz.style.display = 'block';
}