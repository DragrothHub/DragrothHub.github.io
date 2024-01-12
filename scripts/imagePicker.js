var imageHolder = document.getElementById('imageHolder');
var imageHolderCanvas = document.getElementById('imageHolderCanvas');
var imageHolderCanvasCtx = imageHolderCanvas.getContext('2d');

var resultPreviewCanvas = document.getElementById('resultPreviewCanvas');
var resultPreviewCanvasCtx = resultPreviewCanvas.getContext('2d');
var resultOutlineCanvas = document.getElementById('resultOutlineCanvas');
var resultOutlineCanvasCtx = resultOutlineCanvas.getContext('2d');

var findColorsGroup = document.getElementById('findColorsGroup');
var detailsAndGenerateGroup = document.getElementById('detailsAndGenerateGroup');
var resultsGroup = document.getElementById('resultsGroup');

var imagePickerInput = document.getElementById('imagePicker');
imagePickerInput.addEventListener('change', updateValue);

function pickFile()
{
    imagePickerInput.Value = undefined;
    imagePickerInput.click();
}

function updateValue(e)
{
    for (var i = 0; i < e.srcElement.files.length; i++)
    {
        var file = e.srcElement.files[i];

        imageHolder.style.display = 'block';

        var reader = new FileReader();
        reader.onloadend = function ()
        {
            imageHolder.src = reader.result;
            
            var img = new Image();
            img.onload = function ()
            {
                imageHolderCanvas.width = imageHolder.width;
                imageHolderCanvas.height = imageHolder.height;
                imageHolderCanvasCtx.drawImage(img, 0, 0, imageHolder.width, imageHolder.height);
                imageHolderCanvas.style.display = 'block';

                // imageHolderCanvasCtx.arc(100, 100, 25, 0, 2 * Math.PI);
                // imageHolderCanvasCtx.arc(150, 100, 20, 0, 2 * Math.PI);
                // imageHolderCanvasCtx.arc(200, 100, 15, 0, 2 * Math.PI);
                // imageHolderCanvasCtx.arc(250, 100, 10, 0, 2 * Math.PI);
                // imageHolderCanvasCtx.arc(300, 100, 5, 0, 2 * Math.PI);
                // imageHolderCanvasCtx.stroke();

                imageHolder.style.display = 'none';

                resultPreviewCanvas.width = imageHolder.width;
                resultPreviewCanvas.height = imageHolder.height;
                resultPreviewCanvasCtx.drawImage(img, 0, 0, imageHolder.width, imageHolder.height);
                resultPreviewCanvas.style.display = 'block';

                resultOutlineCanvas.width = imageHolder.width;
                resultOutlineCanvas.height = imageHolder.height;
                resultOutlineCanvasCtx.drawImage(img, 0, 0, imageHolder.width, imageHolder.height);
                resultOutlineCanvas.style.display = 'block';

                window.scrollTo(0, document.body.scrollHeight - findColorsGroup.clientHeight);
            }

            img.src = imageHolder.src;
        }
        reader.readAsDataURL(file);

        findColorsGroup.style.display = 'block';
        detailsAndGenerateGroup.style.display = 'none';
        resultsGroup.style.display = 'none';
    }
}