import React from 'react';
import { Route, Switch } from 'react-router';
import { useRecoilState } from 'recoil';
import { isConnected, loggedInState } from './states';

import Header from './components/Header';
import BottomNav from './components/Footer';
import Home from './pages/Home';
import Market from './pages/Market';
import Login from './pages/Login';
import Error from './pages/Error';
import Settings from './pages/Settings';
import Signup from './pages/Signup';

function App() {
	const [user] = useRecoilState(loggedInState);

	var [isOnline, setState] = React.useState(false);
	setInterval(() => {
		setState(isConnected);
	}, 1000);

	if(isOnline) {
		if(user) {
			return(<React.Fragment>
				<Header/>
				<div className="content-wrapper">
					<div className="container-full">
						<Switch>
							<Route path="/settings" component={Settings} />
							<Route path="/exchange" component={Market} />
							<Route path="/" component={Home} />
						</Switch>
					</div>
				</div>
				<BottomNav/>
			</React.Fragment>)
		}else return(<Switch>
			<Route path="/signup" component={Signup} />
			<Route path="/" component={Login}/>
		</Switch>)
	}else return(<Error error={{message:'Internet disconnected',code:502}} />)
}

export default App;
