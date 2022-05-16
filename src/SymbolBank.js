"use strict";

const IMAGE_DIR = "src/Assets/Images/";
const SPRITE_DIR = "src/Assets/Sprites/";

const symbolNames = [
    "fruit",
    "language",
    "call",
    "earlyWake",
    "earlyBed",
    "teeth",
    "antifungal",
    "youtube",
    "twitter",
    "facebook",
    "chocolate",
    "icecream",
    "lounge",
    "porn",
];

let badgeSymbols = [
    "fruit",
    "language",
    "call",
    "earlyWake",
    "earlyBed",
    "teeth",
    "antifungal",
];
let pleasureSymbols = [    
    "youtube",
    "twitter",
    "facebook",
    "chocolate",
    "icecream",
    "lounge",
    "porn",
];

let symbols = [];//dictionary mapped from symbol name to symbol object

function initSymbols(){
    symbolNames.forEach((name, i) => {
        let symbol = createSymbol(name);
        symbols[name] = symbol;
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
        fileName: fileName,
        icon: new Image(),
    }
    symbol.icon.src = fileName;
    //Return symbol
    return symbol;
}
