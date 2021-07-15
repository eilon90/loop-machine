import { observer, inject } from 'mobx-react';

const PlayTable = inject('Samples')(observer((props) => {
    const {Samples} = props;

    return(
        <div id = "play-table">
            <div id = "sample-lines">
                {/* Each sample creates a line, that will be visible if the sample is turned on */}
                {Samples.samples.map((s, index) => <div key = {index} className = {Samples.playlist.some(p => p === index) ? "active-line" : "inactive-line"}></div>)}
            </div>
            <div id = "position-cursor" className = "cursor"></div>
        </div>
    )
}))

export default PlayTable;