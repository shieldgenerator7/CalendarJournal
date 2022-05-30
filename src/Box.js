"use strict";

const TYPE_TEXT = 1;
const TYPE_IMAGE = 2;
const TYPE_CONTAINER = 3;

class Box{
    constructor(content, position, size){
        this.position = position ?? new Vector2();
        this._positionDefault = this.position;
        this.size = size ?? new Vector2();
        this._sizeDefault = this.size;
        this.content = content;
        this.type = getContentType(content);
        this.activate = undefined;//function(mpos){ return false; };
        this.symbolFunction = undefined;//function(symbol){};
        this.textSize = undefined;//used to override standard textSize if necessary
    }

    contains(pos){
        return this.position.x <= pos.x && pos.x <= this.position.x + this.size.x
            && this.position.y <= pos.y && pos.y <= this.position.y + this.size.y;
    }

    selectable(pos){
        return this.activate || this.type == TYPE_CONTAINER;
    }

    addContent(content){
        if (this.type != TYPE_CONTAINER){
            console.error("Cannot add content to non container type!", this.type);
        }
        this.content.push(content);
        this._update();
    }
    _update(){
        this.position = this.content[0]?.position ?? this._positionDefault ?? new Vector2(-1,-1);
        this.size = this.content[0]?.size ?? this._sizeDefault ?? new Vector2(0,0);
        for(let i = 0; i < this.content.length; i++){
            let b = this.content[i];
            let p = b.position;
            let s = b.size;
            if (p.x < this.position.x){
                this.position.x = p.x;
            }
            if (p.y < this.position.y){
                this.position.y = p.y;
            }
            if (p.x + s.x > this.position.x + this.size.x){
                this.size.x = (p.x + s.x) - this.position.x;
            }
            if (p.y + s.y > this.position.y + this.size.y){
                this.size.y = (p.y + s.y) - this.position.y;
            }
        }
    }
}

function getContentType(content){
    //Error checking
    if (!content && content != ""){
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
        if (content instanceof Array){
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
