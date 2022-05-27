"use strict";

let searchResults = {
    query: undefined,
    symbols: [],
}

function filterSymbolNames(query){
    searchResults.query = query;
    searchResults.symbols = symbolSet.symbols.filter(
        symbol => !query || symbol.name.includes(query)
    );
}
