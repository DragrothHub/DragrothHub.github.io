var p1 = document.getElementById('c1');
var p2 = document.getElementById('c2');
var p3 = document.getElementById('c3');
var p4 = document.getElementById('c4');
var p5 = document.getElementById('c5');

var imageHolderCanvas = document.getElementById('imageHolderCanvas');
var imageHolderCanvasCtx = imageHolderCanvas.getContext('2d');

var activeColorToRepick = undefined;

function setNewBackgroundColors(color)
{
    var colorHex = rgbToHex(color);

    switch (activeColorToRepick)
    {
        case 0:
            p1.style.backgroundColor = colorHex;
            p1.classList.remove('foundColorActive');
            break;
        case 1:
            p2.style.backgroundColor = colorHex;
            p2.classList.remove('foundColorActive');
            break;
        case 2:
            p3.style.backgroundColor = colorHex;
            p3.classList.remove('foundColorActive');
            break;
        case 3:
            p4.style.backgroundColor = colorHex;
            p4.classList.remove('foundColorActive');
            break;
        case 4:
            p5.style.backgroundColor = colorHex;
            p5.classList.remove('foundColorActive');
    }
}

p1.onclick = function ()
{
    activeColorToRepick = 0;
    p1.classList.add('foundColorActive');
    p2.classList.remove('foundColorActive');
    p3.classList.remove('foundColorActive');
    p4.classList.remove('foundColorActive');
    p5.classList.remove('foundColorActive');
}
p2.onclick = function ()
{
    activeColorToRepick = 1;
    p1.classList.remove('foundColorActive');
    p2.classList.add('foundColorActive');
    p3.classList.remove('foundColorActive');
    p4.classList.remove('foundColorActive');
    p5.classList.remove('foundColorActive');
}
p3.onclick = function ()
{
    activeColorToRepick = 2;
    p1.classList.remove('foundColorActive');
    p2.classList.remove('foundColorActive');
    p3.classList.add('foundColorActive');
    p4.classList.remove('foundColorActive');
    p5.classList.remove('foundColorActive');
}
p4.onclick = function ()
{
    activeColorToRepick = 3;
    p1.classList.remove('foundColorActive');
    p2.classList.remove('foundColorActive');
    p3.classList.remove('foundColorActive');
    p4.classList.add('foundColorActive');
    p5.classList.remove('foundColorActive');
}
p5.onclick = function ()
{
    activeColorToRepick = 4;
    p1.classList.remove('foundColorActive');
    p2.classList.remove('foundColorActive');
    p3.classList.remove('foundColorActive');
    p4.classList.remove('foundColorActive');
    p5.classList.add('foundColorActive');
}

imageHolderCanvas.onclick = function (e)
{
    if (activeColorToRepick == undefined)
    {
        return;
    }

    try 
    {
        var rect = e.target.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;

        var imageDataPoint = imageHolderCanvasCtx.getImageData(x, y, 1, 1).data;

        var newColor = {
            r: Math.round(imageDataPoint[0]),
            g: Math.round(imageDataPoint[1]),
            b: Math.round(imageDataPoint[2])
        }

        foundColors[activeColorToRepick] = newColor;

        setNewBackgroundColors(foundColors[activeColorToRepick])

        activeColorToRepick = undefined;
    }
    catch (error) 
    {
        console.log(error);
        activeColorToRepick = undefined;
    }
}