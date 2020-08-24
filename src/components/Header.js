import React from "react";
import {Navbar, Row, Col, Button} from "react-bootstrap";

export default () => {
    return (
        <Navbar className='flex'>
            <Navbar.Text>Near Ideas</Navbar.Text>
            <Button>Sign In</Button>
        </Navbar>
    );
};
