"use strict";

const IMAGE_DIR = "src/Assets/Images/";
const SPRITE_DIR = "src/Assets/Sprites/";

let symbolSet = {
    name: "StarterSymbols",
    symbols: [],
};

let symbols = [];//dictionary mapped from symbol name to symbol object
//TODO: deprecate symbolNames
let symbolNames = [];//a list of name of all symbols

function initSymbols(){
    validateSymbolSet(symbolSet);
    symbolSet.symbols.forEach((symbol, i) => {
        loadSymbol(symbol);
        symbols[symbol.name] = symbol;
        symbolNames.push(symbol.name);
    });
}

function createSymbol(symbolName, fileName){
    //Error checking
    if(!symbolName){
        console.error(`Invalid symbolName!: ${symbolName}`);
    }
    //Defaults
    fileName ??= SPRITE_DIR.concat(symbolName, ".png");
    //Create object
    let symbol = {
        name: symbolName,
        imageURL: undefined,
        icon: new Image(),
    }
    symbol.icon.src = fileName;
    //Return symbol
    return symbol;
}

function loadSymbol(symbol, fileName){
    //Error checking
    if(!symbol){
        console.error(`Invalid symbol!: ${symbol}`);
    }
    //Defaults
    fileName ??= SPRITE_DIR.concat(symbol.name, ".png");
    //Load object
    symbol.fileName = fileName;
    symbol.icon = new Image();
    symbol.icon.src = fileName;
    //TODO: set imageURL (temporary measure before custom symbols)
    symbol.imageURL = undefined;
}

function uploadSymbol(file){
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function() {
        //Get values
        let symbolName = file.name.split(".")[0];
        //Create object
        let symbol = {
            name: symbolName,
            imageURL: reader.result,
            icon: new Image(),
        }
        symbol.icon.src = symbol.imageURL;
        //Add symbol to symbolSet
        symbolSet.addSymbol(symbol);
        symbols[symbolName] = symbol;
        symbolNames.push(symbolName);
        //Update UI
        updateSymbolBank();
    }
}

function createSymbolSet(setName, symbolNames){
    let symbolSet = {
        name: setName,
        symbols: [],
    };
    symbolNames.forEach((name, i) => {
        let symbol = createSymbol(name);
        symbolSet.symbols.push(symbol);
    });
    return symbolSet;
}

function uploadSymbolSet(file){
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onloadend = function() {
        let json = reader.result;
        importSymbolSet(json);
    }
}

function importSymbolSet(json){
    symbolSet = JSON.parse(json);
    initSymbols();
    updateSymbolBank();
}
