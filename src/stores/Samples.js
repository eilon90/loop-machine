import {observable, action, makeObservable} from 'mobx';
import bassSample from '../samples/bass.mp3'
import coutry_slideSample from '../samples/coutry_slide.mp3'
import funk_beatsSample from '../samples/funk_beats.mp3'
import mazePoliticsSample from '../samples/mazePolitics.mp3'
import pas3Sample from '../samples/pas3.mp3'
import silentStarSample from '../samples/silentStar.mp3'
import stompySloshSample from '../samples/stompySlosh.mp3'
import stutter_breakbeatsSample from '../samples/stutter_breakbeats.mp3'
import tangguSample from '../samples/tanggu.mp3'

export class Samples {
    constructor() {
        //the samples array stores the audio samples (in useEffect)
        this.samples = [bassSample, coutry_slideSample, funk_beatsSample, mazePoliticsSample, pas3Sample, silentStarSample, stompySloshSample, stutter_breakbeatsSample, tangguSample];
        this.playlist = []; //Stores the indexes of samples that will be turned on when we start playing / the loop restart
        this.playOn = false; //defines if playing is on 
        this.loop = 0; //store the setInterval, for clearring it if needed
        makeObservable(this, {
            samples: observable,
            playlist: observable,
            playOn: observable,
            loop: observable,
            loadSamples: action,
            playLoop: action,
            stopLoop: action,
            sampleToggle: action,
            playPlaylist: action,
            emptyPlaylist: action,
            updatePlaylist: action
        })
    }

    loadSamples() { //in useEfffect, stores all the audio files in the samples array
        const uploadedSamples = [];
        this.samples.forEach(s => {
            const sample =  new Audio(s);
            uploadedSamples.push(sample);
        })
        this.samples = uploadedSamples;
    }

    playLoop() { //starts looping
        if (this.playOn) {return}
        this.playPlaylist(); //triger for the first round
        document.getElementById('position-cursor').classList.add('on-playing'); //starts the graphic cursor animation
        this.loop = setInterval(() => { 
            this.samples.forEach(s => s.currentTime = 0); // makes the samples restart when finnishing
            this.playPlaylist(); //triger for the new samples (only if they weren't active in the last round)
        }, 7950); //Eight seconds exactly create delay. it;s better be shorter  
        this.playOn = true; 
    }

    stopLoop() { //stops the loop
        clearInterval(this.loop); //cancels the next rounds
        this.samples.forEach(s => { 
            s.pause(); //stops the audio
            s.currentTime = 0;
            document.getElementById('position-cursor').setAttribute('class', 'cursor'); //stops the cursor animation
        });
        this.playOn = false;
    }

    sampleToggle(sampleNum) { //mannages each sample when it's turned on/off 
        const itemToDelete = this.playlist.indexOf(sampleNum); //check if it exists in the playlist array
        if (itemToDelete === -1) { //if not, adds it to the playlist to wait for the next round
            this.playlist.push(sampleNum);
        }
        else { //if it's allready there, removes it, and if it's been played - turns it off
            this.playlist.splice(itemToDelete, 1);
            const sample = this.samples[sampleNum];
            if (!sample.paused) {sample.pause()}
        }
    }

    playPlaylist() { //trigers the first round of the audio 
        if (this.playlist === []) {return}
        this.playlist.forEach(p => {
            const sample = this.samples[p];
            if (sample.paused){sample.play()}; //Only if it wasn't active, turns it on
        });
    }

    emptyPlaylist = () => this.playlist = [];
    
    updatePlaylist(list) { //when uploading saved record, update the playlist with its opening samples
        this.emptyPlaylist();
        list.forEach(l => this.playlist.push(l));
    }
}