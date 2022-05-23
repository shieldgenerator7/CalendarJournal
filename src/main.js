"use strict";

//TODO: move this to its own place (it doesnt belong here, i dont think)
let entry;
let record;

function initCalendarJournal(){
    initSymbols();
    updateSymbolBank();
    entry ??= new Entry();
    record = undefined;
    //
    $("cvsEntry").onclick = function(e){
        checkClick(e);
    }
    //
    updateEntryFields(entry);
    generateBoxSet(entry);
    repaintEntryCanvas();
}

//TODO: perhaps move this to another script?
function txtSearchSymbolsChanged(){
    filterSymbolNames($('txtSearchSymbols').value);
    updateSymbolBank();
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
    if (!record){
        if (badgeSymbols.includes(symbol)){
            entry.addBadge(symbol);
        }
        if (pleasureSymbols.includes(symbol)){
            entry.addPleasure(symbol);
        }
    }
    else{
        record.addPart(`[${symbol}]`);
        record.addPart("");
        updateEntryFields(entry);
    }
    generateBoxSet(entry);
    repaintEntryCanvas();
}

//TODO: perhaps remove this function and the HTML element that uses it
function txtRecordChanged(){
    if (!record){
        record = entry.addNewRecord();
    }
    record.addPart($("txtRecord").value);
    updateEntryFields(entry);
    generateBoxSet(entry);
    repaintEntryCanvas();
}
//TODO: perhaps remove this function and the HTML element that uses it
function btnRecordAddClicked(){
    record = undefined;
    entry.cleanRecords();
    updateEntryFields(entry);
    generateBoxSet(entry);
    repaintEntryCanvas();
}

function btnCopyClicked(){
    //2022-05-23: copied from https://stackoverflow.com/a/57546936/2336212
    let canvas = $("cvsEntry");
    canvas.toBlob(function(blob) {
        const item = new ClipboardItem({ "image/png": blob });
        navigator.clipboard.write([item]);
    });
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
