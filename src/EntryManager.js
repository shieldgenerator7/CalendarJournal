"use strict";

let entry;
let entryList;
let entryMap;

function initEntryManager(){
    loadEntry();    
    //set entry
    entry = entryList[entryList.length - 1] ?? new Entry();
}

function saveEntry(){
    //save entries
    if (!entryList.includes(entry)){
        entryList.push(entry);
    }
    localStorage.setItem("CalendarJournal-entryList", JSON.stringify(entryList))
}

function loadEntry(){
    //load entries
    entryList = JSON.parse(localStorage.getItem("CalendarJournal-entryList")) ?? [];
    entryList.forEach((e, i) => {
        validateEntry(e);
    });
}
