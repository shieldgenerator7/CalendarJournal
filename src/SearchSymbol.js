"use strict";

let searchResults = {
    query: undefined,
    symbolNames: [],
}

function filterSymbolNames(query){
    searchResults.query = query;
    searchResults.symbolNames = symbolNames.filter(name=>name.includes(query));
}
