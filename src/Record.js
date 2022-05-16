"use strict";

class Record{
    constructor(){
        this.body = [];
    }

    isValid(){
        return this.body?.length > 0;
    }

    addPart(part){
        if (this.body.length > 0){
            let lastPart = this.body[this.body.length - 1];
            let similar = part.includes(lastPart) || lastPart.includes(part);
            let symbol = isPartSymbol(part) || isPartSymbol(lastPart);
            if (similar && !symbol){
                lastPart = part;
                this.body[this.body.length - 1] = lastPart;
            }
            else{
                this.body.push(part);
            }
        }
        else{
            this.body.push(part);
        }
    }
}

function isPartSymbol(part){
    return part.startsWith("[") && part.endsWith("]");
}
function partToSymbol(part){
    return part.slice(1).slice(0,-1);
}
