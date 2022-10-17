"use strict";

let searchEntryResults = {
    query: undefined,
    entries: [],
}

function filterEntries(query){
    //Sanitize query
    query = query?.trim();
    //Early exit
    if (!query){
        searchEntryResults.query = query;
        searchEntryResults.entries = entryList;
        return;
    }
    //Sanitize query pass 2
    let queries = query.toLowerCase().split(" ").filter(str => str?.trim());
    query = queries.join(" ");
    //Save sanitized query
    searchEntryResults.query = query;
    //Search using query
    searchEntryResults.entries = getEntriesWithText(...queries);
}

function getEntriesWithText(...texts){
    let entries = entryList.filter(
        e => texts.some(n => e.containsText(n))
    );
    return entries;
}
