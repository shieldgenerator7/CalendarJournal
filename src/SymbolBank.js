"use strict";

const IMAGE_DIR = "src/Assets/Images/";
const SPRITE_DIR = "src/Assets/Sprites/";

let symbolSet = {
    name: "StarterSymbols",
    symbols: [],
};

let symbols = [];//dictionary mapped from symbol name to symbol object

function initSymbols(){
    validateSymbolSet(symbolSet);
    symbols = [];
    symbolSet.symbols.forEach((symbol, i) => {
        loadSymbol(symbol);
        symbols[symbol.name] = symbol;
    });
    filterSymbolNames();
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

function loadSymbol(symbol){
    //Error checking
    if(!symbol){
        console.error(`Invalid symbol!: ${symbol}`);
    }
    //Load object
    symbol.icon = new Image();
    symbol.icon.src = symbol.imageURL;
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
        //Update UI
        updateSymbolBank();
    }
}

//TODO: deprecate createSymbolSet()
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
    symbolSet.alphabetizeSymbols();
    updateSymbolBank();
}
// }
