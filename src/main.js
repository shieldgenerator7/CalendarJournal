"use strict";

function initCalendarJournal(){

    window.onbeforeunload = cleanupCalendarJournal;
    //2022-10-19: onfocus onblur copied from https://stackoverflow.com/a/69509921/2336212
    window.onfocus = function (ev) {
        console.log("gained focus");
    };

    window.onblur = function (ev) {
        console.log("lost focus");
        saveEntry();
    };

    initSymbolBank();
    initEntryManager();
    filterEntries();
    updateEntryList();
    //
    let cvsEntry = $("cvsEntry");
    cvsEntry.onclick = function(e){
        checkClick(e);
    }
    cvsEntry.onmousemove = function(e){
        checkMouseMove(e);
    }
    //
    $("txtRecord").addEventListener("keyup", (e)=>{
        //Enter key
        if (e.keyCode === 13){
            //TODO: make method to create new record and edit it
            selection.record = entry.addNewRecord();
            $("txtRecord").focus();
            entry.cleanRecords();
            updateEntryFields(entry);
            generateBoxSet(entry);
            repaintEntryCanvas();
        }
    });
    //Drop image event handlers// Prevent default drag behaviors
    //2022-05-26: copied from https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
    let pnlEntry = $("pnlEntry");
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        pnlEntry.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    })
    pnlEntry.addEventListener('drop', handleDrop, false);
    //
    updateEntryFields(entry);
    generateBoxSet(entry);
    repaintEntryCanvas();
}

function cleanupCalendarJournal(){
    saveEntry();
}

//TODO: perhaps move this to another script?
function txtSearchSymbolsChanged(){
    filterSymbolNames($('txtSearchSymbols').value);
    updateSymbolBank();
}

//TODO: perhaps move this to another script?
function txtSearchEntriesChanged(){
    filterEntries($('txtSearchEntries').value);
    updateEntryList();
}

//TODO: perhaps move this to another script?
function txtTimeChanged(){
    entry.setWakeTime($('txtTimeWake').value);
    entry.setBedTime($('txtTimeBed').value);
    generateBoxSet(entry);
    repaintEntryCanvas();
}

//TODO: perhaps move this to another script?
function btnSymbolClicked(symbol){
    selection.symbolFunction?.(symbol);
    updateEntryFields(entry);
    generateBoxSet(entry);
    repaintEntryCanvas();
}

//TODO: perhaps move this to another script?
function btnEntryClicked(date){
    // selection.symbolFunction?.(symbol);
    entry = getEntry(date);
    updateEntryFields(entry);
    generateBoxSet(entry);
    repaintEntryCanvas();
}

//TODO: perhaps remove this function and the HTML element that uses it
function txtRecordChanged(){
    if (!selection.record){
        selection.record = entry.addNewRecord();
    }
    selection.record.text = $("txtRecord").value;
    selection.record.updateBody();
    updateEntryFields(entry);
    generateBoxSet(entry);
    repaintEntryCanvas();
}

function btnImportSymbolSetClicked(symbolSetName){
    let fileName = `src/Assets/Json/${symbolSetName}.json`;
    //2022-05-26: copied from https://stackoverflow.com/a/46129280/2336212
    fetch(fileName)
        .then(response => response.text())
        .then(json => {
            importSymbolSet(json);
            //update the display
            generateBoxSet(entry);
            repaintEntryCanvas();
        });
    //Remove the button
    $(`btnImport${symbolSetName}`).hidden = true;
}

function btnCopyClicked(){
    //Prepare for clean drawing
    clearSelections();
    repaintEntryCanvas();
    //Copy
    //2022-05-23: copied from https://stackoverflow.com/a/57546936/2336212
    let canvas = $("cvsEntry");
    canvas.toBlob(function(blob) {
        const item = new ClipboardItem({ "image/png": blob });
        navigator.clipboard.write([item]);
    });
}

function btnNewClicked(){
    entry = createEntry();
    generateBoxSet(entry);
    repaintEntryCanvas();
    updateEntryList();
}

function btnCopySymbolSetClicked(){
    //2022-05-23: copied from https://stackoverflow.com/a/57546936/2336212
    let json = JSON.stringify(miscSymbolSet, jsonStrSymbolSet, 1);
    navigator.clipboard.writeText(json);
}


//TODO: move this to Utility script
Math.clamp = function(amount, min, max){
    return Math.max(min, Math.min(amount, max));
}


//TODO: move this to utility script
//2021-10-02: copied from https://stackoverflow.com/a/21015393/2336212
/**
  * Uses canvas.measureText to compute and return the width of the given text of given font in pixels.
  *
  * @param {String} text The text to be rendered.
  * @param {String} font The css font descriptor that text is to be rendered with (e.g. "bold 14px verdana").
  *
  * @see https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393
  */
function getTextSize(text, font) {
  // re-use canvas object for better performance
  font = font ?? "30px Consolas";
  const canvas = $("cvsEntry");
  const context = canvas.getContext("2d");
  context.font = font;
  const metrics = context.measureText(text);
  return new Vector2(metrics.width, metrics.actualBoundingBoxAscent);
}

//Initialize everything
initCalendarJournal();
