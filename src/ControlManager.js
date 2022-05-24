"use strict";

function checkClick(e){
    let mpos = new Vector2(e.offsetX, e.offsetY);
    let box = getBox(mpos);
    setEditBox(box);
    if (box){
        let changed = box.activate?.(mpos);
        // if (changed){
            updateEntryFields(entry);
            generateBoxSet(entry);
            repaintEntryCanvas();
        // }
    }
}

function checkMouseMove(e){
    let mpos = new Vector2(e.offsetX, e.offsetY);
    let box = getBox(mpos);
    if (box != selection.mouseOverBox){
        setMouseOverBox(box);
        repaintEntryCanvas();
    }
}
