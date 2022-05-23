"use strict";

function checkClick(e){
    let mpos = new Vector2(e.offsetX, e.offsetY);
    let box = getBox(mpos);
    if (box){
        let changed = box.activate?.(mpos);
        // if (changed){
            generateBoxSet(entry);
            repaintEntryCanvas();
        // }
    }
}
