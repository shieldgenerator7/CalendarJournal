"use strict";

const BEFORE = 0;
const AFTER = 1;

class Entry{
    constructor(date){
        //2022-05-15: copied from https://stackoverflow.com/a/35922073/2336212
        this.date = date ?? new Date().toISOString().slice(0, 10);
        this.wake = {
            time: 8,
            side: AFTER,
        };
        this.bed = {
            time: 23,
            side: BEFORE,
        };
        this.badges = [];
        this.pleasures = [];
        this.records = [];
    }

    addNewRecord(){
        let record = new Record();
        this.records.push(record);
    }

    cleanRecords(){
        this.records = this.records.filter(record=>record?.isValid());
    }
}
