import React from "react";
import {Navbar, Row, Col, Button} from "react-bootstrap";
import {APP_PATH} from "../constants";
import {Link} from "react-router-dom";

export default ({signIn, signOut, wallet}) => {
    return (
        <Navbar className='flex  bg-blue-200'>
            <div className='flex justify-center  w-1/2 p-2'>
                <Link to={APP_PATH}>Near Ideas</Link>
            </div>
            <div className='flex justify-center  w-1/2 p-2'>
                {wallet.isSignedIn() ? (
                    <Button onClick={signOut}>Sign Out</Button>
                ) : (
                    <Button onClick={signIn}>Sign In</Button>
                )}
            </div>
        </Navbar>
    );
};
