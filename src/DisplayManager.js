"use strict";

function $(elementId) {
    return document.getElementById(elementId);
}

function updateEntryFields(entry){
    $("txtTimeWake").value = entry.wake.time+":00";
    $("txtTimeBed").value = entry.bed.time+":00";
    $("txtRecord").value = record?.body?.[record.body.length-1] ?? "";
    $("btnRecordAdd").disabled = !record;
}

function updateSymbolBank(){
    let symbolBank = $("divBankSymbol");
    let symbolNameList = (searchResults.query?.trim())
        ? searchResults.symbolNames
        : symbolNames;
    let buttonString = symbolNameList
        .map(name => createSymbolButtonString(name))
        .join("");
    symbolBank.innerHTML = buttonString;
}

function createSymbolButtonString(symbolName){
    return ""+
        `<button id="btnSymbol_${symbolName}" class="symbolButton"
            title="${symbolName}"
            onclick="
                console.log('${symbolName} clicked');
                btnSymbolClicked('${symbolName}');
            "
        >
            <img src="src/Assets/Sprites/${symbolName}.png" />
        </button>`;
}

//TODO: perhaps move to a drawing script
function repaintEntryCanvas(boxSet){
    //Defaults
    boxSet ??= getBoxSet();
    //Initialization
    let canvas = $("cvsEntry");
    let ctx = canvas.getContext("2d");
    canvas.width = boxSet.canvasSize;
    canvas.height = boxSet.canvasSize;
    let size = boxSet.canvasSize;
    //Clear rect
    ctx.clearRect(0,0,size,size);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0,0,size,size);
    //Paint boxes
    ctx.fillStyle = "#000000";
    boxSet.boxes.forEach((box, i) => {
        switch (box.type){
            case TYPE_TEXT:
                repaintBoxText(box, boxSet, ctx);
                break;
            case TYPE_IMAGE:
                repaintBoxImage(box, boxSet, ctx);
                break;
            case TYPE_CONTAINER:
                repaintBoxContainer(box, boxSet, ctx);
                break;
            default:
                console.error(
                    "Unknown type!", box.type,
                    "at index:", i,
                    "content:", box.content
                );
        }
    });
    //Circles around wake time
    let textSize = boxSet.textSize;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(
        198*textSize/30,//x
        20*textSize/30,//y
        22*textSize/30,//radius
        0,
        2*Math.PI
    );
    ctx.stroke();
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(
        198*textSize/30,//x
        20*textSize/30,//y
        22*textSize/30,//radius
        -Math.PI/2,
        Math.PI/2,
        entry.wake.side == AFTER
    );
    ctx.stroke();
    //Circles around bed time
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(
        248*textSize/30,//x
        20*textSize/30,//y
        22*textSize/30,//radius
        0,
        2*Math.PI
    );
    ctx.stroke();
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(
        248*textSize/30,//x
        20*textSize/30,//y
        22*textSize/30,//radius
        -Math.PI/2,
        Math.PI/2,
        entry.bed.side == AFTER
    );
    ctx.stroke();
}

function repaintBoxText(box, boxSet, ctx){
    if (!box){
        console.error("Must pass in a box!", box);
    }
    ctx.font = `${boxSet.textSize}px Consolas`;
    ctx.fillText(
        box.content,
        box.position.x,
        box.position.y + boxSet.textSize
    );
}

function repaintBoxImage(box, boxSet, ctx){
    if (!box){
        console.error("Must pass in a box!", box);
    }
    ctx.drawImage(
        box.content,
        box.position.x,
        box.position.y,
        boxSet.textSize,
        boxSet.textSize
    );
}

function repaintBoxContainer(box, boxSet, ctx){
    //TODO: maybe refactor so this method is useful?
}
