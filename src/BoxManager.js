"use strict";

let boxSet = {
    boxes: [],
    textSize: 30,
    canvasSize: 350
}

function generateBoxSet(entry, textSize, canvasSize){
    //Error checking
    if (!entry){
        console.error("Invalid entry!", entry);
        return;
    }
    //Defaults
    textSize ??= boxSet.textSize ?? 30;
    canvasSize ??= boxSet.canvasSize ?? 350;
    //Set boxSet
    boxSet.boxes = [];
    boxSet.textSize = textSize;
    boxSet.canvasSize = canvasSize;
    //Initialization
    let str = "";
    let place = new Vector2(0,0);
    let size = new Vector2(textSize,textSize);
    let box = undefined;
    //Header text date
    str = `${entry.date}`;
    size = new Vector2(getTextSize(str).x, textSize);
    box = createBox(str, place, size);
    box.activate = (mpos) => entry.flipDate();
    place.x += size.x;
    //Header text wake time
    place.x += getTextSize(" ").x;
    str = `${(""+entry.wake.time).padStart(2,"0")}`;
    size = new Vector2(getTextSize(str).x, textSize);
    box = createBox(str, place, size);
    box.activate = (mpos) => entry.setWakeTime();
    place.x += size.x;
    //Header text bed time
    place.x += getTextSize(" ").x;
    str = `${(""+entry.bed.time).padStart(2,"0")}`;
    size = new Vector2(getTextSize(str).x, textSize);
    box = createBox(str, place, size);
    box.activate = (mpos) => entry.setBedTime();
    place.x += size.x;
    place.y += size.y;
    //Place badges
    place.x = 0;
    place.y += textSize * 0.3;
    let badgeLimitX = canvasSize - (textSize*1);
    size = new Vector2(textSize, textSize);
    let containerBox = createBox("container", place, size);
    let boxes = [];
    entry.badges.forEach((badge, i) => {
        let newBox = createBox(
            symbols[badge].icon,
            place,
            size
        );
        boxes.push(newBox);
        place.x += textSize;
        if (place.x >= badgeLimitX - textSize){
            place.x = 0;
            place.y += textSize;
        }
    });
    convertBoxToContainer(containerBox, boxes);
    place.y += textSize;
    //Place pleasures
    let place2 = new Vector2(
        canvasSize - (textSize * 1.1),
        0
    );
    size = new Vector2(textSize, textSize);
    entry.pleasures.forEach((pleasure, i) => {
        createBox(
            symbols[pleasure].icon,
            place2,
            size
        );
        place2.y += textSize;
    });
    //Draw records
    entry.records.forEach((record, i) => {
        place.x = 0;
        record.body.forEach((part, i) => {
            //TODO: scale these parts down (or wrap it?) if it is too wide
            if (!isPartSymbol(part)){
                size = new Vector2(getTextSize(part).x, textSize);
                createBox(
                    part,
                    place,
                    size
                );
            }
            else{
                size = new Vector2(textSize, textSize);
                createBox(
                    symbols[partToSymbol(part)].icon,
                    place,
                    size
                );
            }
            place.x += size.x + (size.y*0.1);
        });
        place.y += textSize;
    });
    //Watermark
    let smallTextSize = textSize / 2;
    let font = `${smallTextSize}px Consolas`;
    str = "initially generated with CalendarJournal";
    place = new Vector2(0, canvasSize - (smallTextSize*1.2));
    size = new Vector2(getTextSize(str, font).x, smallTextSize);
    box = createBox(str, place, size);
    box.textSize = smallTextSize;
}

function createBox(content, position, size){
    let box = new Box(content, position.copy(), size.copy());
    boxSet.boxes.push(box);
    return box;
}

function convertBoxToContainer(box, boxes){
    box.content = boxes;
    box.type = TYPE_CONTAINER;
    box.position = new Vector2(350,350);
    box.size = new Vector2(0,0);
    for(let i = 0; i < boxes.length; i++){
        let b = boxes[i];
        let p = b.position;
        let s = b.size;
        if (p.x < box.position.x){
            box.position.x = p.x;
        }
        if (p.y < box.position.y){
            box.position.y = p.y;
        }
        if (p.x + s.x > box.position.x + box.size.x){
            box.size.x = (p.x + s.x) - box.position.x;
        }
        if (p.y + s.y > box.position.y + box.size.y){
            box.size.y = (p.y + s.y) - box.position.y;
        }
    }
}

function getBox(pos, onlySelectable){
    onlySelectable ??= true;
    let boxes = getBoxes(pos);
    if (onlySelectable){
        boxes = boxes.filter(box=>box.selectable());
    }
    return boxes[0];
}

function getBoxes(pos){
    return boxSet.boxes.filter(
        box => box.contains(pos)
    );
}

function getBoxSet(){
    return boxSet;
}
