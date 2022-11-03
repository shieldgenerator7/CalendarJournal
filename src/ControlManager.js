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
    //2022-05-26: copied from https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
    e.preventDefault()
    e.stopPropagation()
}
function handleDrop(e) {
    //2022-05-26: copied from https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
    let dt = e.dataTransfer;
    let files = dt.files;
    handleFiles(files);
}
const imageFileTypes = [
    "image/png",
];
const symbolSetFileTypes = [
    "text/plain",
    "application/json",
];
function handleFiles(files){
    //2022-05-26: copied from https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
    files = [...files];
    files.forEach((file)=>{
        if (imageFileTypes.includes(file.type)){
            uploadSymbol(file);
        }
        else if (symbolSetFileTypes.includes(file.type)){
            handleTextFile(file);
        }
        else{
            console.warning("Unknown file type:",file.type,"filename:",file.name);
        }
    });
}

function handleTextFile(file){
    if (file.name.endsWith(".entry.json")){
        uploadEntryList(file);
    }
    else{
        uploadSymbolSet(file);
    }
}
