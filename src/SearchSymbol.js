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
        searchResults.symbols = getSymbolsWithName("");
        return;
    }
    //Sanitize query pass 2
    let queries = query.toLowerCase().split(" ").filter(str => str?.trim());
    query = queries.join(" ");
    //Save sanitized query
    searchResults.query = query;
    //Search using query
    searchResults.symbols = getSymbolsWithName(...queries);
}

function getSymbolsWithName(...names){
    let symbolList = [];
    symbolSetList.forEach(symbolSet =>
        symbolList = symbolList.concat(symbolSet.symbols.filter(
            symbol => names.some(n => symbol.name.toLowerCase().includes(n))
        ))
    );
    return symbolList;
}
