import SamplesButtons from './SamplesButtons';
import PlayTable from './PlayTable';

function PlayingBoard() {

    return(
        <div id = "playing-board">
            <div id = "board-container">
                <SamplesButtons/>
                <PlayTable/>
            </div>
        </div>
    )
}

export default PlayingBoard;