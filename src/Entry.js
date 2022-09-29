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

    flipDate(){
        let today = new Date();
        let yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);
        today = today.toISOString().slice(0, 10);
        yesterday = yesterday.toISOString().slice(0, 10);
        if (this.date == today){
            this.date = yesterday;
        }
        else if (this.date == yesterday) {
            this.date = today;
        }
    }

    setWakeTime(timeString){
        timeString ??= getCurrentTimeString();
        let split = timeString.split(":");
        let hour = split[0] * 1;
        let minute = split[1] * 1;
        hour = Math.clamp(hour, 0, 24);
        minute = Math.clamp(minute, 0, 59);
        if (hour == 24){
            hour = 0;
        }
        if (minute >= 45){
            this.wake.time = hour + 1;
            this.wake.side = BEFORE;
        }
        else{
            this.wake.time = hour;
            this.wake.side = AFTER;
        }
    }
    setBedTime(timeString){
        timeString ??= getCurrentTimeString();
        let split = timeString.split(":");
        let hour = split[0] * 1;
        let minute = split[1] * 1;
        hour = Math.clamp(hour, 0, 24);
        minute = Math.clamp(minute, 0, 59);
        if (hour == 24){
            hour = 0;
        }
        if (minute <= 15){
            this.bed.time = hour;
            this.bed.side = AFTER;
        }
        else{
            this.bed.time = hour + 1;
            this.bed.side = BEFORE;
        }
    }

    addBadge(symbol){
        if (this.badges.includes(symbol)){
            this.badges.splice(this.badges.indexOf(symbol), 1);
        }
        this.badges.push(symbol);
    }
    addPleasure(symbol){
        if (this.pleasures.includes(symbol)){
            this.pleasures.splice(this.pleasures.indexOf(symbol), 1);
        }
        this.pleasures.push(symbol);
    }

    addNewRecord(){
        let record = new Record();
        this.records.push(record);
        return record;
    }

    cleanRecords(){
        //Remove empty records
        this.records = this.records.filter(
            record => record?.isValid()
                || selection.record && selection.record == record
        );
    }
}

function getCurrentTimeString(){
    let today = new Date();
    return `${today.getHours()}:${today.getMinutes()}`;
}
