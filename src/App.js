import React, {Component} from "react";
import Header from "./components/Header";
import {APP_TITLE} from "./constants";
import {BrowserRouter as Router, Switch, Route, Redirect, Link} from "react-router-dom";
import CreateIdea from "./components/CreateIdea.js";
import Idea from "./components/Idea";
import "./css/index.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: true,
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
    };

    render() {
        const redirectIfNotSignedIn = (child) => (this.state.login ? child : <Redirect to='/' />);

        const RenderIdeas = ({ideas}) => {
            if (ideas.length < 1) return null;

            const list = ideas.map((idea, i) => <Idea idea={idea} key={`${i}`} />);
            return <div className='flex flex-col px-4 py-2 m-2'>{list}</div>;
        };

        return (
            <Router>
                <Switch>
                    <Route path='/create_idea'>
                        {redirectIfNotSignedIn(
                            <CreateIdea contract={this.props.contract} wallet={this.props.wallet} />
                        )}
                    </Route>
                    <Route
                        path='/'
                        render={() => (
                            <div className='text-center'>
                                <Header />
                                <Link to='/create_idea' className='w-24 bg-yellow-300'>Create Idea</Link>
                                <span>Sort by</span>
                                <h2 className='py-4'>List of Ideas: </h2>
                                <RenderIdeas ideas={this.state.ideas} />
                            </div>
                        )}
                    />
                </Switch>
            </Router>
        );
    }
}

export default App;
