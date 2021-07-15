import {observable, action, makeObservable} from 'mobx';
const moment = require('moment');
const axios = require('axios');

export class Record {
    constructor(samples) {
        this.Samples = samples; //refers to the second store
        this.recordOn = false; // informs if recording is active
        this.playingRecord = false; //informs if playng of record is active
        this.startingTime = {}; //when start new record, stores the time (for getting time ranges for each action)
        this.openingPlaylist = []; // stores the samples status when the recording starts
        this.recordEvents = []; //stores each action in the record
        this.record = {}; //the final record, for replaying or saving
        this.setTimeActions = []; // when playing record, stores the setTime actions, for clearring it if needed
        this.savePopupVisible = false; //controls the save popup visibility
        this.userName = '';
        this.recordingName = '';
        this.savedRecords = []; //stores all the saved records

        makeObservable(this, {
            recordOn: observable,
            playingRecord: observable,
            openingPlaylist: observable,
            recordEvents: observable,
            record: observable,
            setTimeActions: observable,
            savePopupVisible: observable,
            userName: observable,
            recordingName: observable,
            savedRecords: observable,
            manageRecording: action,
            startRecording: action,
            stopRecording: action,
            addToRecord: action,
            playRecord: action,
            playEvent: action,
            stopPlaying: action,
            openSavePopup: action,
            closeSavePopup: action,
            typeUserName: action,
            typeRecoName: action,
            saveRecording: action,
            loadRecord: action,
            fetchRecords: action
        })
    }

    manageRecording() { // if recording is active - stops it, if not - starts recording
        this.recordOn ? this.stopRecording() : this.startRecording();
        this.recordOn = !this.recordOn;
    }

    startRecording() {
        if (this.playOn) {return}
        this.Samples.playlist.forEach(p => this.openingPlaylist.push(p));
        this.startingTime = moment();
        this.record = {};
    }

    stopRecording() {
        const endingTime = moment();
        const duration = endingTime.subtract(this.startingTime); //duration of all the record

        this.record = { // the final record, ready for replaying or savig
          openingPlaylist: this.openingPlaylist,
          duration: duration,
          recordEvents: this.recordEvents
        }

        this.openSavePopup();
        this.startingTime = {};
        this.openingPlaylist = [];
        this.recordEvents = [];
    }
    
    addToRecord(button, newStatus) { //add each action for the record events (if the record is active)
        if(!this.recordOn) {return}
        const action = {
            button: button, //which button was change
            newStatus: newStatus, //on or off
            time: moment().subtract(this.startingTime)
        }
        this.recordEvents.push(action);
    }

    playRecord() { //plays / stops the new / saved record
        if (!this.record.recordEvents || this.recordOn) {return}
        if (this.playingRecord) {
            this.stopPlaying();
            return;
        }
        this.Samples.updatePlaylist(this.record.openingPlaylist); //sets the playlist with opening samples
        this.record.recordEvents.forEach(r => { //each event is been setting to act in the correct time
        const setTime = setTimeout(() => {
            this.playEvent(r); 
        }, moment(r.time));
        this.setTimeActions.push(setTime);
        })
        const setTime = setTimeout(() => { //sets time for ending the record
            this.stopPlaying();
        }, moment(this.record.duration));
        this.playingRecord = true;
        this.setTimeActions.push(setTime);
    }

    playEvent(event) {// //trigers the event
        if (event.button === 'play') {event.newStatus === 'on' ? this.Samples.playLoop() : this.Samples.stopLoop()}
        else {this.Samples.sampleToggle(parseInt(event.button))}
    }

    stopPlaying() {
        this.Samples.stopLoop();
        this.playingRecord = false;
        this.setTimeActions.forEach(s => clearTimeout(s));
        this.setTimeActions = [];
        this.Samples.emptyPlaylist();
    }

    openSavePopup() {
        this.savePopupVisible = true;
    }

    closeSavePopup() {
        this.savePopupVisible = false;
    }

    typeUserName = value => this.userName = value;
    typeRecoName = value => this.recordingName = value;

    async saveRecording() { //saves the record in the database
        const record = this.record;
        record.userName = this.userName;
        record.name = this.recordingName;
        const results = await axios.post('http://localhost:4000/record', record);
        this.savedRecords = results.data;
        this.userName = ''
        this.recordingName = ''
    }

    async fetchRecords() {//gets all the saved records
        const results = await axios.get('http://localhost:4000/records');
        const savedRecords = results.data;
        this.savedRecords = savedRecords;
    }

    loadRecord(value) {//When saved record is chosen, sets it to be ready for playing
        if (this.Samples.playOn) {this.Samples.stopLoop()}
        if (this.playingRecord) {this.stopPlaying()}
        this.startingTime = {};
        this.openingPlaylist = [];
        this.recordEvents = [];
        this.record = this.savedRecords[value];
    }
}