"use strict";

let searchResults = {
    query: undefined,
    symbols: [],
}

function filterSymbolNames(query){
    //Sanitize query
    query = query?.trim();
    //Early exit
    if (!query){
        searchResults.query = query;
        searchResults.symbols = symbolSet.symbols.slice();//shallow copy the array
        return;
    }
    //Sanitize query pass 2
    let queries = query.split(" ").filter(str => str?.trim());
    query = queries.join(" ");
    //Save sanitized query
    searchResults.query = query;
    //Search using query
    searchResults.symbols = symbolSet.symbols.filter(
        symbol => queries.some(q => symbol.name.includes(q))
    );
}
