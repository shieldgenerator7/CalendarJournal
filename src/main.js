"use strict";

function initCalendarJournal(){
    initSymbols();
    updateSymbolBank();
}
initCalendarJournal();

//TODO: perhaps move this to another script?
function txtSearchSymbolsChanged(){
    filterSymbolNames($('txtSearchSymbols').value);
    updateSymbolBank();
}
