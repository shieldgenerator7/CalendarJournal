"use strict";

let selection = {
    mouseOverBox: undefined,
    editBox: undefined,
    symbolFunction: undefined,
    record: undefined,
}

function setMouseOverBox(box){
    selection.mouseOverBox = box;
}

function setEditBox(box){
    selection.editBox = box;
    selection.symbolFunction = box?.symbolFunction;
}

function clearSelections(){
    selection.mouseOverBox = undefined;
    selection.editBox = undefined;
    selection.symbolFunction = undefined;
    selection.record = undefined;
}
