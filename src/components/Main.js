import React, { useState, useRef, useEffect } from 'react';
import Select from './Select';
import { motion } from 'framer-motion';
import Questions from './Questions';
import ErrorModal from './ErrorModal';

const DataFetchingComponent = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [url2, setUrl2] = useState('https://opentdb.com/api.php?amount=1');
    const [isAnimated, setIsAnimated] = useState(false);
    const [isCountdown, setIsCountdown] = useState(false);
    const [isNext, setIsNext] = useState(false);
    const [checkStatus, setCheckStatus] = useState(false);
    const [proceed, setProceed] = useState(false);
    const [animationNext, setAnimationNext] = useState(false);
    const [showAnswerKey, setShowAnswerKey] = useState(false);

    let api = 'https://opentdb.com/api.php?amount=1';
    let options = [];
    const [shuffledOptions, setShuffledOptions] = useState([]);

    const getData = (data) => {
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
                setIsCountdown(false);
                setCheckStatus(false);
                setProceed(false);
                setIsNext(false);
                setQuestions(data.results);
                setLoading(false);
                setShowAnswerKey(false);
                console.log(data.results);
                setIsAnimated(true);
                handleCountdown();
                filterOptions(data.results);
                setAnimationNext(true);
                setError('');
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
                console.log(error.message);
            });
    };

    const checkAnswer = (value) => {
        setProceed(true);
        setCheckStatus(value);
    };

    useEffect(() => {
        console.log('Proceed updated:', proceed);
        setIsNext(checkParams);
    }, [proceed, isCountdown]);

    const checkParams = () => {
        return proceed && isCountdown;
    };

    const handleChecking = (value) => {
        setCheckStatus(value);
    };

    const handleReload = () => {
        setIsNext(false);
        checkAnswer();

        setShowAnswerKey(true);
        if (checkStatus) {
            console.log('you are correct');
        } else {
            console.log('you are wrong');
        }

        setTimeout(() => {
            fetchQuestions(url2);
            setAnimationNext(false);
        }, [3000]);
    };

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const filterOptions = (dataResult) => {
        dataResult.forEach((dataB) => {
            console.log(dataB.category);
            console.log(dataB.type);

            if (dataB.type !== 'boolean') {
                options = [dataB.incorrect_answers[0], dataB.incorrect_answers[1], dataB.incorrect_answers[2], dataB.correct_answer];
            } else {
                options = [dataB.incorrect_answers[0], dataB.correct_answer];
            }

            setShuffledOptions(shuffleArray(options));
        });
    };

    const handleCountdown = () => {
        setTimeout(() => {
            setIsCountdown(true);
        }, [5000]);
    };

    useEffect(() => {
        console.log('error log ' + error);
    }, [error]);

    return (
        <div className="container  main-container">
            <div className="row h-100 d-flex align-items-center justify-content-center">
                <div className="col-12 col-md-6  col-lg-5 col-xl-4">
                    <motion.h1
                        initial={{
                            opacity: 1,
                            transition: { duration: 1 },
                        }}
                        className="text-center mb-3"
                    >
                        QUIZLET
                    </motion.h1>
                    <motion.div className="box p-4" initial={{ y: 100 }} animate={isAnimated ? { y: -100, opacity: 0, display: 'none' } : { y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
                        <Select getData={getData}></Select>
                    </motion.div>
                    <motion.div
                        className="question-box p-4"
                        initial={{ display: 'none', opacity: 0, y: 100, transition: { duration: 1 } }}
                        animate={
                            !isAnimated || !animationNext
                                ? { opacity: 0, y: -100, transition: { duration: 0.2 } }
                                : { y: [100, 0], opacity: 1, display: 'block', transition: { delay: 0.5, duration: 1 } }
                        }
                    >
                        {questions.map((question, index) => (
                            <Questions
                                key={index}
                                type={question.type}
                                question={question.question}
                                correctAns={question.correct_answer}
                                optionsS={shuffledOptions}
                                handleCheck={checkAnswer}
                                isCorrect={handleChecking}
                                showAnswer={showAnswerKey}
                            />
                        ))}

                        <button onClick={handleReload} className="btn btn-primary w-100" disabled={isNext ? false : true}>
                            {isCountdown ? 'Confirm' : 'Read the question first'}
                        </button>
                    </motion.div>
                </div>
            </div>

            <ErrorModal animate={error === 'Failed to fetch'} errVal={setError} back={setIsAnimated}></ErrorModal>
        </div>
    );
};

export default DataFetchingComponent;
