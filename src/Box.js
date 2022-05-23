"use strict";

const TYPE_TEXT = 1;
const TYPE_IMAGE = 2;
const TYPE_CONTAINER = 3;

class Box{
    constructor(content, position, size){
        this.position = position ?? new Vector2();
        this.size = size ?? new Vector2();
        this.content = content;
        this.type = getContentType(content);
    }

    contains(pos){
        return this.position.x <= pos.x && pos.x <= this.position.x + this.size.x
            && this.position.y <= pos.y && pos.y <= this.position.y + this.size.y;
    }
}

function getContentType(content){
    //Error checking
    if (!content){
        console.error("Must pass in some content!", content);
        return undefined;
    }
    //Text
    if (typeof content === "string"){
        return TYPE_TEXT;
    }
    if (typeof content === "object"){
        if (content instanceof Image){
            return TYPE_IMAGE;
        }
        if (content instanceof Box){
            return TYPE_CONTAINER;
        }
        //Default object return value
        console.error("Content of unknown object type:", content.constructor.name);
        return undefined;
    }
    //Default return value
    console.error("Content of unknown type:", content);
    return undefined;
}
