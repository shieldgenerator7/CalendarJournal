"use strict";

function $(elementId) {
    return document.getElementById(elementId);
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
function repaintEntryCanvas(entry, textSize){
    if (!entry){
        console.error("Invalid entry!", entry);
        return;
    }
    textSize ??= 30;
    let canvas = $("cvsEntry");
    let ctx = canvas.getContext("2d");
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    let size = (canvas.width < canvas.height)
        ? canvas.width
        : canvas.height;
    //Clear rect
    ctx.clearRect(0,0,size,size);
    //Header text
    ctx.font = `${textSize}px Consolas`;
    ctx.fillText(
        `${entry.date} ${(""+entry.wake.time).padStart(2,"0")} ${(""+entry.bed.time).padStart(2,"0")}`,
        0,
        textSize
    );
    //Circles around wake time
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
    //Draw badges
    let drawX = 0;
    let drawY = textSize + textSize/2;
    let badgeLimitX = canvas.width-textSize;
    entry.badges.forEach((badge, i) => {
        ctx.drawImage(symbols[badge].icon, drawX, drawY, textSize, textSize);
        drawX += textSize;
        if (drawX >= badgeLimitX - textSize){
            drawX = 0;
            drawY += textSize;
        }
    });
    //Draw pleasures
    let drawX2 = canvas.width-textSize;
    let drawY2 = 0;
    entry.pleasures.forEach((pleasure, i) => {
        ctx.drawImage(symbols[pleasure].icon, drawX2, drawY2, textSize, textSize);
        drawY2 += textSize;
    });
    //Draw records
    drawX = 0;
    drawY += textSize*2;
    entry.records.forEach((record, i) => {
        ctx.fillText(record.body[0], drawX, drawY);
        drawY += textSize;
    });

}
