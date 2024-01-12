function mode(input) {

    var count = [];

    for (var i = 0; i < input.length; i++) {
        count[input[i]]++;
    }

    var index = count.length-1;
    for (var i = count.length - 2; i >= 0; i--) {
        if (count[i] >= count[index])
            index = i;
    }

    return index;
}

function getDistance(x1, y1, x2, y2)
{
    var a = x1 - x2;
    var b = y1 - y2;

    return Math.sqrt( a*a + b*b );
}

function getMainColorOfNeighbors(mat, xStart, yStart, radius)
{
    let height = mat.length;
    let width = mat[0].length;

    var neighborColors = [];
    for (var x = xStart - radius; x <= xStart + radius; x++)
    {
        for (var y = yStart - radius; y <= yStart + radius; y++)
        {
            if (getDistance(xStart, yStart, x, y) <= radius && x >= 0 && x < width && y >= 0 && y < height)
            {
                neighborColors.push(mat[y][x]);
            }
        }
    }

    return mode(neighborColors);
}

function sleep(ms)
{
    return new Promise((r) =>
        setTimeout(r, ms));
}

async function medianFilterMat(mat, radius, foundColors)
{
    let height = mat.length;
    let width = mat[0].length;

    var result = new Array(height);
    for (var i = 0; i < height; i++)
    {
        result[i] = new Array(width);
    }

    var progressBar = document.getElementById("progressBar");
    progressBar.style.display = 'block';

    for (var x = 0; x < width; x++)
    {
        for (var y = 0; y < height; y++)
        {
            result[y][x] = getMainColorOfNeighbors(mat, x, y, radius);
        }

        // Progress bar
        progressBar.style.width = Math.round(x / width * 100) + '%';
        if (Math.round(x / width * 100) == 100)
        {
            progressBar.style.display = 'none';
        }
        await sleep(0);
    }

    return result;
}


// Old median filter
/*

async function medianFilter(imageData, radius, foundColors, ctx)
{
    var t0 = performance.now();

    let width = imageData.width;
    let height = imageData.height;
    var input = imageData.data;
    var output = ctx.createImageData(imageData.width, imageData.height);
    var progressBar = document.getElementById("progressBar");
    progressBar.style.display = 'block';
    for (var x = 0; x < width; x++)
    {
        for (var y = 0; y < height; y++)
        {
            var index = (x + y * width) * 4;
            var bufferRed = [];
            var bufferGreen = [];
            var bufferBlue = [];
            for (var cx = 0; cx < radius; cx++)
            {
                for (var cy = 0; cy < radius; cy++)
                {
                    if (x + cx < width && y + cy < height)
                    {
                        var idx = (x + cx + (y + cy) * width) * 4;
                        bufferRed.push(input[idx]);
                        bufferGreen.push(input[idx + 1]);
                        bufferBlue.push(input[idx + 2]);
                    }
                }
            }

            // Take only colors from found colors
            var tempColor = { 
                r:median(bufferRed.sort()), 
                g:median(bufferGreen.sort()),
                b:median(bufferBlue.sort())
            }

            tempColor = foundColors[getBestFittingColor(foundColors, tempColor)];

            output.data[index] = tempColor.r;
            output.data[index + 1] = tempColor.g;
            output.data[index + 2] = tempColor.b;
            output.data[index + 3] = 255;
        }

        //Progress bar
        if(Math.round(x / width * 100) % 10 == 0)
        {
            progressBar.style.width = Math.round(x / width * 100) + '%';
            if(Math.round(x / width * 100) == 100)
            {
                progressBar.style.display = 'none';
            }
            await sleep(0);
        }
    }

    console.log('medianFilter: ' + (performance.now() - t0));

    return output;
}

*/