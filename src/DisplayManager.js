"use strict";

function $(elementId) {
    return document.getElementById(elementId);
}

function updateSymbolBank(){
    let symbolBank = $("divBankSymbol");
    let symbolNameList = (searchResults.query?.trim())
        ? searchResults.symbolNames
        : symbolNames;
    let buttonString = symbolNameList
        .map(name => createSymbolButtonString(name))
        .join("");
    symbolBank.innerHTML = buttonString;
}

function createSymbolButtonString(symbolName){
    return ""+
        `<button id="btnSymbol_${symbolName}" class="symbolButton"
            title="${symbolName}"
            onclick="console.log('${symbolName} clicked')"
        >
            <img src="src/Assets/Sprites/${symbolName}.png" />
        </button>`;
}
