
document.getElementById('downloadOutline').addEventListener('click', function(e) {
    let canvas = document.getElementById('resultOutlineCanvas');
    // Convert our canvas to a data URL
    let canvasUrl = canvas.toDataURL();
    // Create an anchor, and set the href value to our data URL
    const createEl = document.createElement('a');
    createEl.href = canvasUrl;

    // This is the name of our downloaded file
    createEl.download = "Umrandung";

    // Click the download button, causing a download, and then remove it
    createEl.click();
    createEl.remove();
});

document.getElementById('downloadPreview').addEventListener('click', function(e) {
    let canvas = document.getElementById('resultPreviewCanvas');
    // Convert our canvas to a data URL
    let canvasUrl = canvas.toDataURL();
    // Create an anchor, and set the href value to our data URL
    const createEl = document.createElement('a');
    createEl.href = canvasUrl;

    // This is the name of our downloaded file
    createEl.download = "Vorschau";

    // Click the download button, causing a download, and then remove it
    createEl.click();
    createEl.remove();
});