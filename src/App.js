import './App.css';
import { observer, inject } from 'mobx-react';
import { useEffect, useState } from 'react';
import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core';
import Header from './components/Header';
import PlayPause from './components/PlayPause';
import Recording from './components/Recording';
import PlayingBoard from './components/PlayingBoard';
import Save from './components/Save';

const App = inject('Samples', 'Record')(observer((props) => {
  const {Samples, Record} = props;

  const theme = createTheme({
    palette: {
      primary: {
        main: '#24db9d'
      },
      secondary: {
        main: "#fcca04"
      }
    }
  })

  useEffect(() => {
    Samples.loadSamples();
    Record.fetchRecords();
  }, [])

  return (
    <ThemeProvider theme = {theme}>
      <div id = "app">
        <Header/>
        <Recording/>
        <PlayingBoard/>
        <PlayPause/>
      </div>
      <Save/>
    </ThemeProvider>
  )
}))

export default App;
