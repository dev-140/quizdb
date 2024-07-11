import React, { useState } from 'react';
import { motion } from 'framer-motion';

function Questions(props) {
    let options = [];
    const [clickedIndex, setClickedIndex] = useState(null);

    if (props.type !== 'boolean') {
        options = [props.op1, props.op2, props.op3, props.op4];
    } else {
        options = [props.op1, props.op4];
    }

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const shuffledOptions = shuffleArray(options);

    const handleAnswer = (index) => {
        console.log(`Button ${index} clicked`);
        setClickedIndex(index);
    };

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

            {shuffledOptions.map((option, index) => (
                <motion.button
                    initial={{
                        x: 50,
                        opacity: 0,
                    }}
                    animate={{
                        x: 0,
                        opacity: 1,
                        y: clickedIndex === index ? 10 : 0, // Change background color if clicked
                    }}
                    transition={{ duration: index + 0.5 }}
                    key={index}
                    className="btn btn-secondary mb-3 w-100"
                    dangerouslySetInnerHTML={{ __html: option }}
                    onClick={handleAnswer}
                ></motion.button>
            ))}
        </>
    );
}

export default Questions;
