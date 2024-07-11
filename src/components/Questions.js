import React from 'react';

function Questions(props) {
    return (
        <>
            <p className="question" dangerouslySetInnerHTML={{ __html: props.question }}></p>
        </>
    );
}

export default Questions;
