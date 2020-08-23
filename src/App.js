import React, {useState, useEffect, Component} from "react";
import logo from "./public/logo.svg";
import Header from "./components/Header";
import {APP_TITLE} from "./constants";
import "./App.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: false,
            ideas: [],
        };
    }

    componentDidMount() {
        this.props.contract.get_all_ideas().then((ideas) => {
            this.setState({
                ideas,
            });
        });
    }

    signIn = async () => {
        await this.props.wallet.requestSignIn(window.nearConfig.contractName, APP_TITLE);
    };

    signOut = async () => {};

    render() {
        console.log(this.state.ideas);
        return (
            <div className='App'>
                <Header />
                <header className='App-header'>
                    <img src={logo} className='App-logo' alt='logo' />
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>

                    <a
                        className='App-link'
                        href='https://reactjs.org'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        Learn React
                    </a>
                </header>
            </div>
        );
    }
}

export default App;
