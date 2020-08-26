import React, {Component} from "react";
import Header from "./components/Header";
import {APP_TITLE, MIN_DEPOSIT_AMOUNT, APP_PATH} from "./constants";
import {BrowserRouter as Router, Switch, Route, Redirect, Link} from "react-router-dom";
import CreateIdea from "./components/CreateIdea.js";
import Idea from "./components/Idea";
import "regenerator-runtime/runtime";
import "./css/index.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ideas: [],
        };
    }

    componentDidMount() {
        try {
            this.props.contract.get_all_ideas().then((ideas) => {
                this.setState({
                    ideas: Object.values(ideas),
                });
            });
        } catch (err) {
            console.err(err);
        }
    }

    upvoteIdea = async ({idea_id}) => {
        if (!this.props.wallet.isSignedIn()) {
            window.alert("You need to sign in to vote an idea!");
            return;
        }
        try {
            await this.props.contract.upvote_idea(
                {
                    idea_id,
                },
                null,
                MIN_DEPOSIT_AMOUNT
            );
        } catch (err) {
            console.error(err);
        }
    };

    signIn = async () => {
        await this.props.wallet.requestSignIn(window.nearConfig.contractName, APP_TITLE);
    };

    signOut = async () => {
        this.props.wallet.signOut();
        setTimeout(window.location.replace(window.location.origin + APP_PATH), 500);
    };

    render() {
        const redirectIfNotSignedIn = (child) =>
            this.props.wallet.isSignedIn() ? child : <Redirect to={APP_PATH} />;

        const RenderIdeas = ({ideas}) => {
            if (ideas.length < 1) return null;

            const list = ideas.map((idea, i) => (
                <Idea upvoteIdea={this.upvoteIdea} idea={idea} key={`${i}`} />
            ));
            return <div className='flex flex-col px-4 py-2 m-2'>{list}</div>;
        };

        return (
            <Router>
                <Header signIn={this.signIn} signOut={this.signOut} wallet={this.props.wallet} />

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
                                <Link
                                    onClick={() => {
                                        if (!this.props.wallet.isSignedIn()) {
                                            window.alert("You need to sign in to create a new idea!");
                                        }
                                    }}
                                    to='/create_idea'
                                    className='w-24 bg-yellow-300'
                                >
                                    Create Idea
                                </Link>
                                <h2 className='py-4'>Total Ideas: {this.state.ideas.length}</h2>
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
