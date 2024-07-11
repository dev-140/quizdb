import React, { useState, useEffect } from 'react';
import Select from './Select';
import { motion } from 'framer-motion';
import Questions from './Questions';

const DataFetchingComponent = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(true);
    const [key, setKey] = useState(0);
    const [url2, setUrl2] = useState('https://opentdb.com/api.php?amount=1');

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
                // console.log(response.json());
            })
            .then((data) => {
                setQuestions(data.results);
                setLoading(false);
                console.log(data.results);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    };

    const handleReload = () => {
        fetchQuestions(url2);
    };

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
                    <div className="box p-4">
                        <Select getData={getData}></Select>
                    </div>
                    <div className="question-box p-4">
                        {questions.map((question) => (
                            <Questions key={key} question={question.question} />
                        ))}

                        <button onClick={handleReload} className="btn btn-primary mt-3 w-100">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataFetchingComponent;
