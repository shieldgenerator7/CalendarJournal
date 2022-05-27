"use strict";

const jsonStrRecord = [
    "text",
]

class Record{
    constructor(){
        this.text = "";
        //unsaved
        this.body = [];
    }

    isValid(){
        return true && this.text;
    }

    //Split text into parts, and store them in body
    updateBody(){
        //symbol format: "...text... [symbolName] ...text..."
        this.body = this.text
            .split(/[\s\[\]]+/)//split on spaces, [, ],
            .map(part => part?.trim())
            .filter(part => part);

    }
}

function isPartSymbol(part){
    return part.startsWith("[") && part.endsWith("]")
        || symbols[part];
}
//TODO: deprecate this?
function partToSymbolName(part){
    return part.slice(1).slice(0,-1);
}
