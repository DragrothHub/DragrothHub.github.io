// Checks if neighbors (right and bottom) are the same. Returns false if one is not the same. -> Why not all?
function neighborsSame(mat, x, y)
{
    var width = mat[0].length;
    var height = mat.length;
    var val = mat[y][x];

    var xRel = [1, 0];
    var yRel = [0, 1];
    
    for (var i = 0; i < xRel.length; i++)
    {
        var xx = x + xRel[i];
        var yy = y + yRel[i];
        if (xx >= 0 && xx < width && yy >= 0 && yy < height)
        {
            if (mat[yy][xx] != val)
            {
                return false;
            }
        }
    }
    return true;
};

// Iterates over all points and checks if neighbors are same. Returns new matrix with 0 or 1. 1 stands for outline.
function outline(mat)
{
    var width = mat[0].length;
    var height = mat.length;
    var result = [];
    for (var i = 0; i < height; i++)
    {
        result[i] = new Array(width);
    }
    for (var y = 0; y < height; y++)
    {
        for (var x = 0; x < width; x++)
        {
            result[y][x] = neighborsSame(mat, x, y) ? 0 : 1;
        }
    }
    return result;
};