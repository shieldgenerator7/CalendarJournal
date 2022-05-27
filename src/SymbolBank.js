"use strict";

const IMAGE_DIR = "src/Assets/Images/";
const SPRITE_DIR = "src/Assets/Sprites/";

let symbolSet = {
    name: "StarterSymbols",
    symbols: [
        {
            name: "fruit",
            imageURL: "",
        },
        {
            name: "vegetable",
            imageURL: "",
        },
        {
            name: "language",
            imageURL: "",
        },
        {
            name: "call",
            imageURL: "",
        },
        {
            name: "earlyWake",
            imageURL: "",
        },
        {
            name: "earlyWakeAlarm",
            imageURL: "",
        },
        {
            name: "earlyBed",
            imageURL: "",
        },
        {
            name: "teeth",
            imageURL: "",
        },
        {
            name: "antifungal",
            imageURL: "",
        },
        {
            name: "washClothes",
            imageURL: "",
        },
        {
            name: "washBed",
            imageURL: "",
        },
        {
            name: "comb",
            imageURL: "",
        },
        {
            name: "cook",
            imageURL: "",
        },
        {
            name: "litterpan",
            imageURL: "",
        },
        {
            name: "plant",
            imageURL: "",
        },
        {
            name: "showerShampoo",
            imageURL: "",
        },
        {
            name: "trash",
            imageURL: "",
        },
        {
            name: "trim",
            imageURL: "",
        },
        {
            name: "draw",
            imageURL: "",
        },
        {
            name: "write",
            imageURL: "",
        },
        {
            name: "shopping",
            imageURL: "",
        },
        {
            name: "help",
            imageURL: "",
        },
        {
            name: "money",
            imageURL: "",
        },
        {
            name: "alarmClock",
            imageURL: "",
        },
        {
            name: "organize",
            imageURL: "",
        },
        {
            name: "mail",
            imageURL: "",
        },
        {
            name: "protest",
            imageURL: "",
        },
        {
            name: "doctor",
            imageURL: "",
        },
        {
            name: "cat",
            imageURL: "",
        },
        {
            name: "youtube",
            imageURL: "",
        },
        {
            name: "twitter",
            imageURL: "",
        },
        {
            name: "facebook",
            imageURL: "",
        },
        {
            name: "chocolate",
            imageURL: "",
        },
        {
            name: "icecream",
            imageURL: "",
        },
        {
            name: "candy",
            imageURL: "",
        },
        {
            name: "fastfood",
            imageURL: "",
        },
        {
            name: "pizza",
            imageURL: "",
        },
        {
            name: "lounge",
            imageURL: "",
        },
        {
            name: "porn",
            imageURL: "",
        },
        {
            name: "sighting",
            imageURL: "",
        },
        {
            name: "explore",
            imageURL: "",
        },
        {
            name: "walk",
            imageURL: "",
        },
        {
            name: "run",
            imageURL: "",
        },
        {
            name: "bike",
            imageURL: "",
        }
    ],
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
    console.log("uploadSymbol",file);
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
