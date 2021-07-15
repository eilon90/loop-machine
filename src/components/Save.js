import { observer, inject } from 'mobx-react';
import { Dialog, DialogTitle, DialogActions, Button, TextField } from '@material-ui/core';

const Save = inject('Samples', 'Record')(observer((props) => {
    const {Samples, Record} = props;

    const cancel = () => Record.closeSavePopup();
    const save = () => {
        Record.saveRecording();
        Record.closeSavePopup();
    }

    const typeUserName = e => Record.typeUserName(e.target.value);
    const typeRecoName = e => Record.typeRecoName(e.target.value);

    return(
        <Dialog id = "save-dialog" open = {Record.savePopupVisible}>
            <DialogTitle id = "save-dialog-title">Save the recording?</DialogTitle>
            <DialogActions id = "dialog">
                <div id = "inputs">
                    <input id="user-name" value = {Record.userName} onChange = {typeUserName} placeholder = "User Name"/>
                    <input id="recording-name" placeholder = "Recording Name" value = {Record.recordingName} onChange = {typeRecoName}/>
                </div>
                <div id = "popup-buttons">
                    <Button onClick={cancel} color = "primary">Cancel</Button>
                    <Button onClick={save} color = "primary" disabled = {!Record.userName || !Record.recordingName}>Save</Button>
                </div>
            </DialogActions>
        </Dialog>
    )
}))

export default Save;