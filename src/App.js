import React, {Component} from "react";
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
                ideas: Object.values(ideas),
            });
        });
    }

    signIn = async () => {
        await this.props.wallet.requestSignIn(window.nearConfig.contractName, APP_TITLE);
    };

    signOut = async () => {
        this.props.wallet.signOut();
        setTimeout(this.signedOutFlow, 500);
        console.log("after sign out", this.props.wallet.isSignedIn());
    };

    render() {
        console.log(Object.values(this.state.ideas));
        const RenderIdeas = ({ideas}) => {
            if (ideas.length < 1) return null;

            const list = ideas.map((idea, i) => (
                <li key={`${i}`}>
                    <p>Title: </p>
                    <span>{idea.title}</span>
                </li>
            ));
            return <ol>{list}</ol>;
        };

        return (
            <div className='App'>
                <Header />

                <RenderIdeas ideas={this.state.ideas} />
                <a
                    className='App-link'
                    href='https://reactjs.org'
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    Learn React
                </a>
            </div>
        );
    }
}

export default App;
