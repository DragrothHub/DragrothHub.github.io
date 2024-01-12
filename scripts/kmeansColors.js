function euclideanDistance(p1, p2)
{
    var s = 0;
    for (var i = 0, l = p1.length; i < l; i++)
    {
        s += Math.pow(p1[i] - p2[i], 2)
    }
    return Math.sqrt(s);
}

function calculateCenter(points, n)
{
    var vals = [];
    var plen = 0;
    for (var i = 0; i < n; i++) { vals.push(0); }
    for (var i = 0; i < points.length; i++)
    {
        plen++;
        for (var j = 0; j < n; j++)
        {
            vals[j] += points[i][j];
        }
    }
    for (var i = 0; i < n; i++)
    {
        vals[i] = vals[i] / plen;
    }
    return vals;
}

function kmeans(points, k, min_diff, interationTry)
{
    plen = points.length;
    clusters = [];
    seen = [];
    while (clusters.length < k)
    {
        idx = parseInt(Math.random() * plen);
        found = false;
        for (var i = 0; i < seen.length; i++)
        {
            if (idx === seen[i])
            {
                found = true;
                break;
            }
        }
        if (!found)
        {
            seen.push(idx);
            clusters.push([points[idx], [points[idx]]]);
        }
    }

    var iterationCounter = interationTry;

    while (true)
    {
        iterationCounter++;

        if (iterationCounter > 200)
        {
            // Infinite iteration in k-means
            iterationCounter++;
            if(iterationCounter > 10)
            {
                alert('Could not find good colors. Please retry.');
                return;
            }

            return kmeans(points, k, min_diff, iterationCounter);
        }

        plists = [];
        for (var i = 0; i < k; i++)
        {
            plists.push([]);
        }

        for (var j = 0; j < plen; j++)
        {
            var p = points[j];
            var smallest_distance = 10000000;
            var idx = 0;
            for (var i = 0; i < k; i++)
            {
                var distance = euclideanDistance(p, clusters[i][0]);
                if (distance < smallest_distance)
                {
                    smallest_distance = distance;
                    idx = i;
                }
            }
            plists[idx].push(p);
        }

        var diff = 0;
        for (var i = 0; i < k; i++)
        {
            var old = clusters[i];
            var list = plists[i];
            var center = calculateCenter(plists[i], 3);
            var new_cluster = [center, (plists[i])];
            var dist = euclideanDistance(old[0], center);
            clusters[i] = new_cluster;
            diff = diff > dist ? diff : dist;
        }
        if (diff < min_diff)
        {
            break;
        }
    }

    return clusters;
}

function rgbToHex(rgb)
{
    function th(i)
    {
        var h = parseInt(i).toString(16);
        return h.length == 1 ? '0' + h : h;
    }
    return '#' + th(rgb.r) + th(rgb.g) + th(rgb.b);
}

function findColorsWithKmeans(img, ctx, numColors)
{
    var points = [];
    ctx.drawImage(img, 0, 0, 200, 200);
    data = ctx.getImageData(0, 0, 200, 200).data;
    for (var i = 0, l = data.length; i < l; i += 4)
    {
        var r = data[i];
        var g = data[i + 1];
        var b = data[i + 2];
        points.push([r, g, b]);
    }
    var resultClusters = kmeans(points, numColors, 1, 0);

    var results = [];
    for (var i = 0; i < resultClusters.length; i++)
    {
        results.push({
            r: Math.round(resultClusters[i][0][0]),
            g: Math.round(resultClusters[i][0][1]),
            b: Math.round(resultClusters[i][0][2])
        });
    }

    return results;
}