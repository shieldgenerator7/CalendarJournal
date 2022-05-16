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
