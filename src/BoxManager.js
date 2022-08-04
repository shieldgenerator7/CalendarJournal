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
    let place = new Vector2(0, 0);
    let size = new Vector2(textSize, textSize);
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
    str = `${("" + entry.bed.time).padStart(2, "0")}`;
    size = new Vector2(getTextSize(str).x, textSize);
    box = createBox(str, place, size);
    box.activate = (mpos) => entry.setBedTime();
    place.x += size.x;
    place.y += size.y;
    //Place badges
    place.x = 0;
    place.y += textSize * 0.3;
    let badgeLimitX = canvasSize - (textSize * 1);
    size = new Vector2(textSize, textSize);
    let containerBox = createContainer(
        place,
        new Vector2(
            boxSet.canvasSize - boxSet.textSize,
            boxSet.textSize
        )
    );
    containerBox.symbolFunction = (symbol)=>{
        entry.addBadge(symbol);
    };
    entry.badges.forEach((badge, i) => {
        let newBox = createBox(
            symbols[badge].icon,
            place,
            size
        );
        containerBox.addContent(newBox);
        place.x += textSize;
        if (place.x >= badgeLimitX - textSize){
            place.x = 0;
            place.y += textSize;
        }
    });
    place.y += textSize;
    //Place pleasures
    let place2 = new Vector2(
        canvasSize - (textSize * 1.1),
        0
    );
    size = new Vector2(textSize, textSize);
    containerBox = createContainer(
        place2,
        new Vector2(
            boxSet.textSize,
            boxSet.canvasSize
        )
    );
    containerBox.symbolFunction = (symbol)=>{
        entry.addPleasure(symbol);
    };
    entry.pleasures.forEach((pleasure, i) => {
        let newBox = createBox(
            symbols[pleasure].icon,
            place2,
            size
        );
        containerBox.addContent(newBox);
        place2.y += textSize;
    });
    //Draw records
    let recordLimitX = canvasSize - (textSize * 1);
    let recordLimitY = canvasSize - (textSize * 0.5);
    let recordBoxList = [];
    entry.records.forEach((record, i) => {
        place.x = 0;
        containerBox = createContainer(
            place,
            new Vector2(
                boxSet.canvasSize - boxSet.textSize,
                boxSet.textSize
            )
        );
        recordBoxList.push(containerBox);
        containerBox.activate = ()=>{
            selection.record = record;
            $("txtRecord").focus();
        };
        containerBox.symbolFunction = (symbol)=>{
            selection.record.text += `[${symbol}]`;
            selection.record.updateBody();
            $("txtRecord").focus();
        };
        record.body.forEach((part, i) => {
            let newBox;
            //TODO: scale these parts down (or wrap it?) if it is too wide
            if (!isPartSymbol(part)){
                size = new Vector2(getTextSize(part).x, textSize);
                newBox = createBox(
                    part,
                    place,
                    size
                );
            }
            else{
                size = new Vector2(textSize, textSize);
                newBox = createBox(
                    symbols[part].icon,
                    place,
                    size
                );
            }
            containerBox.addContent(newBox);
            place.x += size.x + (size.y*0.3);
        });
        //Scale down record box if its too wide
        if (containerBox.size.x > recordLimitX){
            let scaleFactor = recordLimitX / containerBox.size.x;
            let smallTextSize = boxSet.textSize * scaleFactor;
            containerBox.content.forEach((box, i) => {
                box.size = box.size.scale(scaleFactor);
                box.position.x *= scaleFactor;
                box.textSize = smallTextSize;
            });
            containerBox._update();
        }
        //
        place.y += containerBox.size.y;
    });
    //Scale down record boxes if there's too many rows
    let firstRow = recordBoxList[0];
    let lastRow = recordBoxList.slice(-1)[0];
    if (lastRow?.position.y + lastRow?.size.y > recordLimitY){
        let maxTextSize = (recordLimitY - firstRow.position.y) / recordBoxList.length;
        recordBoxList.forEach((container, i) => {
            if (container.size.y > maxTextSize){
                let scaleFactor = maxTextSize / container.size.y;
                container.content.forEach((box, j) => {
                    box.size = box.size.scaleProportionY(maxTextSize);
                    box.position.x *= scaleFactor;
                    box.textSize = maxTextSize;
                });
                container._update();
            }
        });
        let placeRow = new Vector2(0, firstRow.position.y);
        recordBoxList.forEach((container, i) => {
            container.position = placeRow.copy();
            container.content.forEach((box, j) => {
                box.position.y = container.position.y;
            });
            placeRow.y += container.size.y;
        });
        place = placeRow.copy();
    }
    //New record box
    place.x = 0;
    containerBox = createContainer(
        place,
        new Vector2(
            boxSet.canvasSize - boxSet.textSize,
            boxSet.textSize
        )
    );
    containerBox.activate = ()=>{
        selection.record = entry.addNewRecord();
        $("txtRecord").focus();
        updateEntryFields(entry);
        generateBoxSet(entry);
        repaintEntryCanvas();
    };
    containerBox.symbolFunction = (symbol)=>{
        selection.record.text += ` [${symbol}] `;
        selection.record.updateBody();
        $("txtRecord").focus();
        updateEntryFields(entry);
        generateBoxSet(entry);
        repaintEntryCanvas();
    };
    place.y += textSize;
    //Watermark
    let smallTextSize = textSize / 2;
    let font = `${smallTextSize}px Consolas`;
    str = "initially generated with CalendarJournal";
    place = new Vector2(0, canvasSize - (smallTextSize * 1.2));
    size = new Vector2(getTextSize(str, font).x, smallTextSize);
    box = createBox(str, place, size);
    box.textSize = smallTextSize;
}

function createBox(content, position, size){
    let box = new Box(content, position.copy(), size.copy());
    boxSet.boxes.push(box);
    return box;
}

function createContainer(position, size){
    let box = new Box(
        [],
        position?.copy(),
        size?.copy()
    );
    boxSet.boxes.push(box);
    return box;
}

function getBox(pos, onlySelectable){
    onlySelectable ??= true;
    let boxes = getBoxes(pos);
    if (onlySelectable){
        boxes = boxes.filter(box => box.selectable());
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
