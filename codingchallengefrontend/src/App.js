import React from 'react';
import logo from './logo.svg';
import './App.css';
import ShortenerForm from "./components/ShortenerForm";
import {Route, BrowserRouter as Router, Switch, Link} from "react-router-dom";
import TopUrls from "./components/TopUrls";

function App() {
    return (
        <div className="App">
            <div className="App-container">
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <div className="App-name">URL Shortener</div>
                            <ShortenerForm>
                            </ShortenerForm>
                            <Link className="App-link" to="/top">Top URLs</Link>
                        </Route>
                        <Route exact path="/top">
                            <TopUrls />
                        </Route>
                    </Switch>
                </Router>
            </div>
        </div>

    );
}
export default App;
