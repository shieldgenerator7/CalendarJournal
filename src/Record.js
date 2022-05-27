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
        this.body = [];
        //symbol format: "...text... [symbolName] ...text..."
        let symbolParts = this.text
            .split(/[\[\]]+/);
        this.body = this.body.concat(symbolParts);
        this.cleanParts();
    }

    cleanParts(){
        this.body = this.body.map(part =>
            (typeof part === "string") ?part.trim() :part
        );
        this.body = this.body.filter(part=>part);
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
