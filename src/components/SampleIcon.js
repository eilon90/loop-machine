import { observer, inject } from 'mobx-react';

const SampleIcon = inject('Samples', 'Record')(observer((props) => {
    const {icon, value, Samples, Record} = props;
    const isTurnedOn = Samples.playlist.some(p => p === value);


    const changeToggle = e => {
        Samples.sampleToggle(value); //manage the sample turning on/off
        const newStatus = isTurnedOn ? 'on' : 'off'; 
        Record.addToRecord(value, newStatus); //if recrod button is turned on, the action will be saved
    }

    return (
        <div id = "sampleIcon">
            <img onClick = {changeToggle} className = {isTurnedOn ? 'sample-button-clicked' : 'sample-button'} src = {icon}/>
        </div>
    )
}))

export default SampleIcon;