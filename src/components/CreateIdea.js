import React from "react";
import {Row, Col, Form, Button, Alert} from "react-bootstrap";
import {APP_PATH} from "../constants";
import {Link, Redirect} from "react-router-dom";

class CreateIdea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            link: "",
            toHome: false,
        };
    }

    updateTitle(val) {
        this.setState({
            ...this.state,
            title: val,
        });
    }

    updateLink(val) {
        this.setState({
            ...this.state,
            link: val,
        });
    }

    async createIdea() {
        if (this.state.link.length == 0 || this.state.link.length == 0) return null;
        this.setState({
            toHome: true,
        });

        try {
            await this.props.contract.create_idea({
                title: this.state.title,
                link: this.state.link,
            });
        } catch (err) {
            console.error(err);
        }
    }

    render() {
        if (this.state.toHome) {
            return <Redirect to={APP_PATH} />;
        }
        return (
            <div className='flex flex-col'>
                <div className='m-auto my-6'>
                    <Link
                        className='border-solid border-4 border-black-200 p-2 hover:bg-gray-200 font-bold '
                        to={APP_PATH}
                    >
                        Back
                    </Link>
                    <div className='mt-4 text-xl font-medium'>
                        <h2 className='bg-black text-white p-2 text-center'>Create a new idea</h2>
                    </div>

                    <Form
                        noValidate
                        onSubmit={(e) => {
                            e.preventDefault();
                            this.createIdea();
                        }}
                    >
                        <Row className='my-5'>
                            <Col className='my-5'>
                                <Form.Control
                                    onChange={(e) => {
                                        this.updateTitle(e.target.value);
                                    }}
                                    type='text'
                                    placeholder='Title of your idea'
                                />
                            </Col>
                            <Col className='my-5'>
                                <Form.Control
                                    onChange={(e) => {
                                        this.updateLink(e.target.value);
                                    }}
                                    type='text'
                                    placeholder='Link to your idea'
                                />
                            </Col>
                            <Col className='my-5'>
                                <Button
                                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                                    variant='primary'
                                    type='submit'
                                >
                                    Create
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
        );
    }
}

export default CreateIdea;
