import { observer, inject } from 'mobx-react';
import {PlayArrow, Stop} from '@material-ui/icons';

const PlayPause = inject('Samples', 'Record')(observer((props) => {
    const {Samples, Record} = props;

    const playLoop = () => {
        Samples.playLoop();  //start playing
        Record.addToRecord('play', 'on'); //if recrod button is turned on, the action will be saved
    }

    const stopLoop = () => { 
        Samples.stopLoop(); //stop playing
        Record.addToRecord('play', 'off'); //same like above
    }

    return (
        <div id = "playPause">
            <PlayArrow id = {Samples.playOn ? "play-button-clicked" : "play-button"} onClick = {playLoop}/>
            <Stop id = {Samples.playOn ? "stop-button" : "stop-button-clicked"} onClick = {stopLoop}/>
        </div>
    )
}))

export default PlayPause;