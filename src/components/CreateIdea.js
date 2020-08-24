import React from "react";
import {Row, Col, Form, Button, Alert} from "react-bootstrap";
import {Link, Redirect} from "react-router-dom";

class CreateIdea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            url: "",
            toHome: false,
        };
    }

    updateTitle(val) {
        this.setState({
            ...this.state,
            title: val,
        });
    }

    updateUrl(val) {
        this.setState({
            ...this.state,
            url: val,
        });
    }

    async createIdea() {
        if (this.state.url.length == 0 || this.state.url.length == 0) return null;
        this.setState({
            toHome: true,
        });
        console.log(this.props.contract);

        try {
            await this.props.contract.create_idea({
                title: this.state.title,
                url: this.state.url,
            });
        } catch (err) {
            console.error(err);
        }
    }

    render() {
        if (this.state.toHome) {
            return <Redirect to='/' />;
        }
        return (
            <div className='flex flex-col'>
                <div className='m-auto my-6'>
                    <Link to='/'>Back</Link>
                    <h2 className='bg-black text-white'>Create a new idea</h2>

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
                                    placeholder='Title'
                                />
                            </Col>
                            <Col className='my-5'>
                                <Form.Control
                                    onChange={(e) => {
                                        this.updateUrl(e.target.value);
                                    }}
                                    type='text'
                                    placeholder='Url'
                                />
                            </Col>
                            <Col className='my-5'>
                                <Button className='bg-blue-400' variant='primary' type='submit'>
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
