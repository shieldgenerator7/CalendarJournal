"use strict";

let entry;
let entryList;
let entryMap;

function initEntryManager(){
    //load entry list
    loadEntry();
    //set entry
    entry = entryList[entryList.length - 1] ?? createEntry();
    //init entryMap
    updateEntryMap();
}

function saveEntry(){
    //save entries
    if (!entryList.includes(entry)){
        entryList.push(entry);
    }
    localStorage.setItem("CalendarJournal-entryList", JSON.stringify(entryList));
}

function loadEntry(){
    //load entries
    entryList = JSON.parse(localStorage.getItem("CalendarJournal-entryList")) ?? [];
    entryList.forEach((e, i) => {
        validateEntry(e);
    });
}

function getEntry(date){
    let result = entryMap[date];
    if (!result){
        console.error(`Given date is not in the entryMap! ${date}`);
    }
    return result;
}

function createEntry(){
    let newEntry = new Entry();
    entryList.push(newEntry);
    updateEntryMap();
    return newEntry;
}

function updateEntryMap(){
    entryMap = {};
    entryList.forEach((e)=>{
        let key = e.date;
        //error checking
        if (entryMap[key]){
            console.error(`Date has more than one entry! ${key}. Using most recent one`);
        }
        //Add entry to map
        entryMap[key] = e;
    });
}
