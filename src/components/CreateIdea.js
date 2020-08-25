import React from "react";
import {Row, Col, Form, Button, Alert} from "react-bootstrap";
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
        console.log(this.props.contract);

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
                                        this.updateLink(e.target.value);
                                    }}
                                    type='text'
                                    placeholder='link'
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
