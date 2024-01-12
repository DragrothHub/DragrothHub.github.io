function getRegion(mat, covered, x, y)
{
    var region = { color: mat[y][x], points: [[x, y]] };
    var color = mat[y][x];

    var queue = [[x, y]];
    while (queue.length > 0)
    {
        var coord = queue.shift();
        if (!covered[coord[1]][coord[0]] && mat[coord[1]][coord[0]] == color)
        {
            region.points.push([coord[0], coord[1]]);
            covered[coord[1]][coord[0]] = true;
            if (coord[0] > 0) { queue.push([coord[0] - 1, coord[1]]); }
            if (coord[0] < mat[0].length - 1) { queue.push([coord[0] + 1, coord[1]]); }
            if (coord[1] > 0) { queue.push([coord[0], coord[1] - 1]); }
            if (coord[1] < mat.length - 1) { queue.push([coord[0], coord[1] + 1]); }
        }
    }

    return region;
}

function getNeighboringColor(region, mat)
{
    var x = region.points[0][0];
    var y = region.points[0][1];
    while (mat[y][x] == region.color)
    {
        y++;
    }
    return mat[y][x];
}

function recolorRegion(region, mat, covered)
{
    if (region.points[0][1] > 0)
    {
        var newColor = mat[region.points[0][1] - 1][region.points[0][0]];
    }
    else
    {
        var newColor = getNeighboringColor(region, mat);
    }

    for (var i = 0; i < region.points.length; i++)
    {
        mat[region.points[i][1]][region.points[i][0]] = newColor;
        covered[region.points[i][1]][region.points[i][0]] = false;
    }
}

function getSameColoredPixelCountInDirection(mat, x, y, incX, incY)
{
    var value = mat[y][x];
    var count = -1;
    while (x >= 0 && x < mat[0].length && y >= 0 && y < mat.length && mat[y][x] == value)
    {
        count++;
        x += incX;
        y += incY;
    }
    return count;
}

function getLabelLocation(region, mat)
{
    var bestI = 0;
    var best = 0;

    var stepSize = 10; // Stepsize can help for a better performance (whilst reducing the goodness of label positions)

    var l = region.points.length;
    for (var i = 0; i < l; i+=stepSize)
    {
        var goodness = getSameColoredPixelCountInDirection(mat, region.points[i][0], region.points[i][1], -1, 0) *
        getSameColoredPixelCountInDirection(mat, region.points[i][0], region.points[i][1], 1, 0) *
        getSameColoredPixelCountInDirection(mat, region.points[i][0], region.points[i][1], 0, -1) *
        getSameColoredPixelCountInDirection(mat, region.points[i][0], region.points[i][1], 0, 1);
        if (goodness > best)
        {
            best = goodness;
            bestI = i;
        }
    }
    return {
        color: region.color,
        point: 
        {
            x: region.points[bestI][0],
            y: region.points[bestI][1]
        }
    }
}

function paintLabelLocations(mat, labels)
{
    var l = labels.length;
    for(var i = 0; i < l; i++)
    {
        mat[labels[i].point.y][labels[i].point.x] = 5;
    }

    return mat;
}

function sleep(ms)
{
    return new Promise((r) =>
        setTimeout(r, ms));
}

async function generateLabels(mat)
{
    var t0 = performance.now();
    
    var progressBar = document.getElementById("progressBar");
    progressBar.style.display = 'block';

    var height = mat.length;
    var width = mat[0].length;
    var covered = new Array(height);
    for (var i = 0; i < height; i++)
    {
        covered[i] = (new Array(width)).fill(false);
    }

    var labels = new Array();

    for (var y = 0; y < height; y++)
    {
        for (var x = 0; x < width; x++)
        {
            if (!covered[y][x])
            {
                var region = getRegion(mat, covered, x, y);

                if (region.points.length > 100)
                {
                    labels.push(getLabelLocation(region, mat));
                }
                else
                {
                    recolorRegion(region, mat, covered);
                }
            }
        }

        //Progress bar (second 50% in 5% steps)
        if(Math.round(y / height * 50) % 5 == 0)
        {
            progressBar.style.width = (Math.round(y / height * 50) + 50) + '%';
            if(Math.round(y / height * 50) == 50)
            {
                progressBar.style.display = 'none';
            }
            await sleep(0);
        }
    }

    console.log('generateLabels: ' + (performance.now() - t0));

    return { matrix: mat, labels: labels};
}