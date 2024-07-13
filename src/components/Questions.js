import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function Questions(props) {
    const [clickedIndex, setClickedIndex] = useState(null);

    const handleAnswer = (index, value) => {
        setClickedIndex(index);
        console.log(`Button ${index} clicked with value ${value}`);
        props.handleCheck(props.correctAns === value);
        props.isCorrect(value === props.correctAns);
    };

    useEffect(() => {
        if (props.showAnswer) {
            console.log('status op: ' + props.showAnswer);
        } else {
            console.log('status op: ' + props.showAnswer);
        }
    }, [props.showAnswer]);

    useEffect(() => {
        setClickedIndex(null);
    }, [props.optionsS]);

    return (
        <>
            <motion.p
                initial={{
                    x: 50,
                    opacity: 0,
                }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="question"
                dangerouslySetInnerHTML={{ __html: props.question }}
            ></motion.p>

            {props.optionsS.map((option, index) => (
                <motion.button
                    initial={{
                        opacity: 0,
                        scale: 1,
                    }}
                    animate={{
                        x: clickedIndex === index && props.showAnswer && props.correctAns !== option ? [-5, 0, 5, 0, -5, 0, 5, 0, -5, 0, 5, 0] : 0,
                        opacity: 1,
                        scale: clickedIndex === index ? 1.05 : 1,
                        transition: { duration: 0.2 },
                    }}
                    transition={{ delay: 300, duration: index + 0.5 }}
                    key={index}
                    className={`btn btn-secondary mb-3 w-100 option-btn ${clickedIndex === index ? 'active' : 'default'} ${props.showAnswer && props.correctAns === option ? 'correct' : 'default'}`}
                    data-value={option}
                    disabled={props.showAnswer ? true : false}
                    dangerouslySetInnerHTML={{ __html: option }}
                    onClick={() => handleAnswer(index, option)}
                ></motion.button>
            ))}
        </>
    );
}

export default Questions;
