"use strict";

const IMAGE_DIR = "src/Assets/Images/";
const SPRITE_DIR = "src/Assets/Sprites/";

let symbolSet = {
    name: "StarterSymbols",
    symbols: [
        {
            name: "fruit",
            icon: {},
        },
        {
            name: "vegetable",
            icon: {},
        },
        {
            name: "language",
            icon: {},
        },
        {
            name: "call",
            icon: {},
        },
        {
            name: "earlyWake",
            icon: {},
        },
        {
            name: "earlyWakeAlarm",
            icon: {},
        },
        {
            name: "earlyBed",
            icon: {},
        },
        {
            name: "teeth",
            icon: {},
        },
        {
            name: "antifungal",
            icon: {},
        },
        {
            name: "washClothes",
            icon: {},
        },
        {
            name: "washBed",
            icon: {},
        },
        {
            name: "comb",
            icon: {},
        },
        {
            name: "cook",
            icon: {},
        },
        {
            name: "litterpan",
            icon: {},
        },
        {
            name: "plant",
            icon: {},
        },
        {
            name: "showerShampoo",
            icon: {},
        },
        {
            name: "trash",
            icon: {},
        },
        {
            name: "trim",
            icon: {},
        },
        {
            name: "draw",
            icon: {},
        },
        {
            name: "write",
            icon: {},
        },
        {
            name: "shopping",
            icon: {},
        },
        {
            name: "help",
            icon: {},
        },
        {
            name: "money",
            icon: {},
        },
        {
            name: "alarmClock",
            icon: {},
        },
        {
            name: "organize",
            icon: {},
        },
        {
            name: "mail",
            icon: {},
        },
        {
            name: "protest",
            icon: {},
        },
        {
            name: "doctor",
            icon: {},
        },
        {
            name: "cat",
            icon: {},
        },
        {
            name: "youtube",
            icon: {},
        },
        {
            name: "twitter",
            icon: {},
        },
        {
            name: "facebook",
            icon: {},
        },
        {
            name: "chocolate",
            icon: {},
        },
        {
            name: "icecream",
            icon: {},
        },
        {
            name: "candy",
            icon: {},
        },
        {
            name: "fastfood",
            icon: {},
        },
        {
            name: "pizza",
            icon: {},
        },
        {
            name: "lounge",
            icon: {},
        },
        {
            name: "porn",
            icon: {},
        },
        {
            name: "sighting",
            icon: {},
        },
        {
            name: "explore",
            icon: {},
        },
        {
            name: "walk",
            icon: {},
        },
        {
            name: "run",
            icon: {},
        },
        {
            name: "bike",
            icon: {},
        }
    ],
};

let symbols = [];//dictionary mapped from symbol name to symbol object
//TODO: deprecate symbolNames
let symbolNames = [];//a list of name of all symbols

function initSymbols(){
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
