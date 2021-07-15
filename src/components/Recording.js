import { observer, inject } from 'mobx-react';
import { Button, FormControl, InputLabel, Select, MenuItem} from '@material-ui/core';
import {FiberManualRecord, PlayArrow, Stop} from '@material-ui/icons';

const Recording = inject('Samples', 'Record')(observer((props) => {
    const {Samples, Record} = props;

    const manageRecording = () => Record.manageRecording(); 
    const playRecord = () => Record.playRecord();
    const chooseRecord = e => Record.loadRecord(e.target.value);
    //The next variables are declared here for simplizing the JSX. They use to make the buttons disabled when it's needed.
    const recording = Record.recordOn;
    const playing = Record.playingRecord;
    const record = Record.record.recordEvents;
    const playOn = Samples.playOn;
    const savedRecords = Record.savedRecords[0] ? Record.savedRecords : [];

    return(
        <div id = "record">
            <div id = "record-buttons">
                <Button color = "secondary" variant="contained" className = "record-button" onClick = {manageRecording} startIcon = {recording ? <Stop/> : <FiberManualRecord/>} disabled = {playing || (playOn && !recording) ? true : false}>{recording ? 'Stop' : 'Record Session'}</Button>
                <Button color = "secondary" variant="contained" className = "record-button" onClick = {playRecord} startIcon = {playing ? <Stop/> : <PlayArrow/>} disabled = {recording || !record || (playOn && !playing)? true : false}>{playing ? 'Stop' : 'Play Session'}</Button>
            </div>
            {savedRecords[0] && <FormControl id = "select-form" variant="outlined">
                <InputLabel id="saved-records">Upload save record</InputLabel>
                <Select labelId="saved-records" id="saved-select" onChange={chooseRecord} variant = 'filled' color = 'secondary'>
                    {savedRecords.map((s, index) => <MenuItem key = {index} value = {index}>{s.name} / {s.userName}</MenuItem>)}
                </Select>
            </FormControl>}
        </div>
    )
}))

export default Recording;