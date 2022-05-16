"use strict";

//TODO: move this to its own place (it doesnt belong here, i dont think)
let entry;

function initCalendarJournal(){
    initSymbols();
    updateSymbolBank();
    entry ??= new Entry();
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


//TODO: move this to Utility script
Math.clamp = function(amount, min, max){
    return Math.max(min, Math.min(amount, max));
}
