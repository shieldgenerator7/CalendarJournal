"use strict";

function $(elementId) {
    return document.getElementById(elementId);
}

function updateSymbolBank(){
    let symbolBank = $("divBankSymbol");
    let buttonString = symbolNames
        .map(name => createSymbolButtonString(name))
        .join("<br>");
    symbolBank.innerHTML = buttonString;
}

function createSymbolButtonString(symbolName){
    return ""+
        `<button id="btnSymbol_${symbolName}" class="symbolButton"
            onclick="console.log('${symbolName} clicked')"
        >
            <img src="src/Assets/Sprites/${symbolName}.png" />
        </button>`;
}

//TODO: move this call to the main controller script
updateSymbolBank();
