import React from 'react';
import { useRecoilState } from 'recoil';
import App from './App';
import './SplashScreen.css';
import logo from './logo.png'
import { appLoadedState } from './states';

function Welcome() {
    const [state, setState] = useRecoilState(appLoadedState);

    React.useEffect(function() {
        // load all config modules
        setTimeout(() => { setState(true) }, 1000);
    }, [setState])

    if(state) return(<App />)
    else return(<SplashScreen/>)
}

function SplashScreen() {
    return(<React.Fragment>
        <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {/* <span className="fa fa-refresh fa-spin"></span> */}
        </header>
      </div>
    </React.Fragment>)
}

export default Welcome;