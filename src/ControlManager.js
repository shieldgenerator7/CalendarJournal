"use strict";

function checkClick(e){
    let mpos = new Vector2(e.offsetX, e.offsetY);
    let box = getBox(mpos);
    setEditBox(box);
    if (box){
        let changed = box.activate?.(mpos);
        // if (changed){
            updateEntryFields(entry);
            generateBoxSet(entry);
            repaintEntryCanvas();
        // }
    }
}

function checkMouseMove(e){
    let mpos = new Vector2(e.offsetX, e.offsetY);
    let box = getBox(mpos);
    if (box != selection.mouseOverBox){
        setMouseOverBox(box);
        repaintEntryCanvas();
    }
}

function preventDefaults (e) {
    console.log("preventDefaults");
    //2022-05-26: copied from https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
    e.preventDefault()
    e.stopPropagation()
}
function handleDrop(e) {
    console.log("handleDrop");
    //2022-05-26: copied from https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
    e.preventDefault();
    e.stopPropagation();
    let dt = e.dataTransfer;
    let files = dt.files;

    handleFiles(files);
}
function handleFiles(fileNames){//...fileNames){
    console.log("handleFiles");
    //2022-05-26: copied from https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
    //if (fileNames.length == 1 && fileNames[0] instanceof FileList){
        fileNames = [...fileNames];
    //}
    files
        .filter(file => file.type == "image/png")
        .forEach(uploadSymbol);
    files
        .filter(file => file.type == "text/plain")
        .forEach(uploadSymbolSet);
}
