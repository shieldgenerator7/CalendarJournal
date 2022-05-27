"use strict";

const TEMPLATE_SYMBOL = {
    name: "template",
    imageURL: undefined,//instances are required to have an actual imageURL
    //not saved
    icon: undefined,//actual image that can be drawn on canvas
}

const jsonStrSymbolSet = [
    //Symbol Set
    "name",
    "symbols",
    //Symbol
    "name",
    "imageURL",
]

class SymbolSet{
    constructor(name){
        this.name = name;
        this.symbols = [];
    }

    addSymbol(...symbols){
        this.symbols = this.symbols.concat(symbols);
    }

    filterSymbols(query){
        return this.symbols.filter(symbol => symbol.name.includes(query));
    }

    alphabetizeSymbols(){
        this.symbols.sort(
            (a, b) => a.name.localeCompare(b.name)
        );
    }
}

function validateSymbolSet(symbolSet){
    //Error checking
    if (!symbolSet){
        console.error(`No symbolSet!:`, symbolSet);
        return;
    }
    //Prototype
    Object.setPrototypeOf(symbolSet, SymbolSet.prototype);
    //Defaults
    symbolSet.name ??= "";
    symbolSet.symbols ??= [];
    //Check symbols
    symbolSet.symbols.forEach((symbol, i) => {
        //Symbol Name
        symbol.name ??= "";
        if (!symbol.name){
            console.error(
                `Symbol at index ${i} in SymbolSet ${symbolSet.name}
                has no name! name: ${symbol.name}`
            );
        }
        //Symbol image
        if (!symbol.imageURL){
            console.error(
                `Symbol ${symbol.name} (${i}) has no imageURL: ${symbol.imageURL}`
            );
        }
    });
}
