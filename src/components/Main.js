import React, { useState, useRef } from 'react';
import Select from './Select';
import { motion } from 'framer-motion';
import Questions from './Questions';

const DataFetchingComponent = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(true);
    const [key, setKey] = useState(0);
    const [url2, setUrl2] = useState('https://opentdb.com/api.php?amount=1');
    const [isAnimated, setIsAnimated] = useState(false);
    const [isCountdown, setIsCountdown] = useState(false);
    const isCountdownRef = useRef(isCountdown);
    const [time, setTime] = useState(5);
    const [isNext, setIsnext] = useState(false);

    let api = 'https://opentdb.com/api.php?amount=1';

    const getData = (data) => {
        // Fetch trivia questions with the token
        if (data.category !== '0') {
            api += `&category=${data.category}`;
        }
        if (data.difficulty !== '0') {
            api += `&difficulty=${data.difficulty}`;
        }
        if (data.type !== '0') {
            api += `&type=${data.type}`;
        }

        setUrl2(api);
        console.log(api);

        fetchQuestions(api);
    };

    const fetchQuestions = (customApi) => {
        fetch(customApi)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setTime(5);
                setIsCountdown(false);
                setQuestions(data.results);
                setLoading(false);
                console.log(data.results);
                setKey((prevKey) => prevKey + 1);
                setIsAnimated(true);
                handleCountdown();
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    };

    const handleReload = () => {
        fetchQuestions(url2);
    };

    const handleCountdown = () => {
        for (let i = 0; i < 5; i++) {
            setTimeout(
                () => {
                    setTime((prevCountdown) => prevCountdown - 1);
                    if (i === 4) {
                        isCountdownRef.current = true; // Update ref value directly
                        setIsCountdown(true); // Trigger state update if needed for UI changes
                        console.log(isCountdownRef.current); // Log current ref value
                    }
                },
                (i + 1) * 1000,
            );
        }
    };

    console.log(1);

    return (
        <div className="container  main-container">
            <div className="row h-100 d-flex align-items-center justify-content-center">
                <div className="col-12 col-md-4">
                    <motion.h1
                        initial={{
                            y: 50,
                        }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-3"
                    >
                        QUIZLET
                    </motion.h1>
                    <motion.div className="box p-4" initial={{ y: 100 }} animate={isAnimated ? { y: -100, opacity: 0, display: 'none' } : { y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
                        <Select getData={getData}></Select>
                    </motion.div>
                    <motion.div
                        className="question-box p-4"
                        initial={{ display: 'none', opacity: 0, y: 100, transition: { duration: 0 } }}
                        animate={!isAnimated ? { display: 'none', opacity: 0, y: 100, transition: { duration: 0 } } : { y: 0, opacity: 1, display: 'block' }}
                        transition={{ delay: 0.5 }}
                    >
                        {questions.map((question) => (
                            <Questions
                                key={key}
                                type={question.type}
                                question={question.question}
                                op1={question.incorrect_answers[0]}
                                op2={question.incorrect_answers[1]}
                                op3={question.incorrect_answers[2]}
                                op4={question.correct_answer}
                            />
                        ))}

                        <button onClick={handleReload} className="btn btn-primary w-100" disabled={isNext && isCountdown ? false : true}>
                            {isCountdown ? 'Confirm' : time}
                        </button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default DataFetchingComponent;
