import { observer, inject } from 'mobx-react';
import bassIcon from '../icons/bassIcon.png';
import DJIcon from '../icons/DJIcon.png';
import drums1Icon from '../icons/drums1Icon.png';
import drums2Icon from '../icons/drums2Icon.png';
import organIcon from '../icons/Ugav.png';
import percussionIcon from '../icons/percussionIcon.png';
import headphonesIcon from '../icons/headphones.png';
import discIcon from '../icons/disc.png';
import guitarIcon from '../icons/guitar.png';
import SampleIcon from './SampleIcon';

const SamplesButtons = inject('Samples')(observer((props) => {
    const {Samples} = props;
    const icons = [bassIcon, guitarIcon, DJIcon, discIcon, drums1Icon, organIcon, drums2Icon, headphonesIcon, percussionIcon];

    return(
        <div id = "SamplesButtons">
            {Samples.samples.map((s, index) => <SampleIcon key = {index} icon = {icons[index]} value = {index}/>)}
        </div>
    )
}))

export default SamplesButtons;