import React from "react";
import {Card} from "react-bootstrap";

const Idea = ({idea, upvoteIdea}) => (
    <Card className='bg-gray-400 px-4 py-2 m-2'>
        <Card.Text>{idea.title}</Card.Text>
        <Card.Text>{idea.owner_account_id}</Card.Text>
        <Card.Text>{idea.vote_count}</Card.Text>
        <Card.Text>{idea.link}</Card.Text>
        <button className='w-7 bg-yellow-300' onClick={() => upvoteIdea(idea)}>
            Up Vote
        </button>
    </Card>
);

export default Idea;
