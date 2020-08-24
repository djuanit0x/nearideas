import React from "react";
import {Navbar, Row, Col, Button} from "react-bootstrap";

export default () => {
    return (
        <Navbar className='flex  bg-blue-200'>
            <div className='flex justify-center  w-1/2 p-2'>
                <Navbar.Text>Near Ideas</Navbar.Text>
            </div>

            <div className='flex justify-center  w-1/2 p-2'>
                <Button>Sign In</Button>
            </div>
        </Navbar>
    );
};
