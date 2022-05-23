"use strict";

let boxSet = {
    boxes: [],
}

function updateBoxSet(entry, textSize, canvasSize){
    //Error checking
    if (!entry){
        console.error("Invalid entry!", entry);
        return;
    }
    //Defaults
    textSize ??= 30;
    canvasSize ??= 350;
    //Initialization
    let str = "";
    let place = new Vector2(0,0);
    let size = new Vector2(textSize,textSize);
    //Header text date
    str = `${entry.date}`;
    size = new Vector2(textSize,textSize);
    createBox(str, place, size);
    place.x += size.x;
    //Header text wake time
    str = `${(""+entry.wake.time).padStart(2,"0")}`;
    size = new Vector2(textSize,textSize);
    createBox(str, place, size);
    place.x += size.x;
    //Header text bed time
    str = `${(""+entry.bed.time).padStart(2,"0")}`;
    size = new Vector2(textSize,textSize);
    createBox(str, place, size);
    place.x += size.x;
    place.y += size.y;
    //Place badges
    let badgeLimitX = canvasSize - textSize;
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
    let place2 = new Vector2(badgeLimitX, 0);
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
                size = new Vector2(getTextSize(part), textSize);
                createBox(
                    part,
                    place,
                    size
                );
                place.x += size.x;
            }
            else{
                size = new Vector2(textSize, textSize);
                createBox(
                    symbols[partToSymbol(part)].icon,
                    place,
                    size
                );
                place.x += size.x;
            }
        });
        place.y += textSize;
    });
}

function createBox(content, position, size){
    let box = new Box(content, position, size);
    boxSet.boxes.push(box);
    return box;
}

function getBox(pos){
    return getBoxes(pos)[0];
}

function getBoxes(pos){
    return boxSet.boxes.filter(
        box => box.contains(pos)
    );
}
