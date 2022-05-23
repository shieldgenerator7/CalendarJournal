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
    box.activate = entry.flipDate();
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
    let badgeLimitX = canvasSize - (textSize*2);
    size = new Vector2(textSize, textSize);
    entry.badges.forEach((badge, i) => {
        createBox(
            symbols[badge].icon,
            place,
            size
        );
        place.x += textSize;
        if (place.x >= badgeLimitX - textSize){
            place.x = 0;
            place.y += textSize;
        }
    });
    place.y += textSize;
    //Place pleasures
    let place2 = new Vector2(
        canvasSize - (textSize * 2.1),
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
        place.X = 0;
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
            place.x += size.x;
        });
        place.y += textSize;
    });
}

function createBox(content, position, size){
    let box = new Box(content, position.copy(), size.copy());
    boxSet.boxes.push(box);
    return box;
}

function getBox(pos){
    let boxes = getBoxes(pos);
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