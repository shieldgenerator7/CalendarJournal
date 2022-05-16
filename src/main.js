"use strict";

//TODO: move this to its own place (it doesnt belong here, i dont think)
let entry;
let record;

function initCalendarJournal(){
    initSymbols();
    updateSymbolBank();
    entry ??= new Entry();
    record = undefined;
    repaintEntryCanvas(entry);
}
initCalendarJournal();

//TODO: perhaps move this to another script?
function txtSearchSymbolsChanged(){
    filterSymbolNames($('txtSearchSymbols').value);
    updateSymbolBank();
}

//TODO: perhaps move this to another script?
function txtTimeChanged(){
    entry.setWakeTime($('txtTimeWake').value);
    entry.setBedTime($('txtTimeBed').value);
    repaintEntryCanvas(entry);
}

//TODO: perhaps move this to another script?
function btnSymbolClicked(symbol){
    if (badgeSymbols.includes(symbol)){
        entry.addBadge(symbol);
    }
    if (pleasureSymbols.includes(symbol)){
        entry.addPleasure(symbol);
    }
    repaintEntryCanvas(entry);
}

//TODO: perhaps remove this function and the HTML element that uses it
function txtRecordChanged(){
    if (!record){
        record = entry.addNewRecord();
    }
    record.addPart($("txtRecord").value);
    repaintEntryCanvas(entry);
}

//TODO: move this to Utility script
Math.clamp = function(amount, min, max){
    return Math.max(min, Math.min(amount, max));
}
