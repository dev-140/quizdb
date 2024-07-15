import React, { useState } from 'react';
import { motion } from 'framer-motion';

function Select(props) {
    const [params, setParams] = useState({
        category: '0',
        difficulty: '0',
        type: '0',
    });

    const handleCategory = (e) => {
        const { value } = e.target;

        setParams((prevParams) => ({
            ...prevParams,
            category: value,
        }));
    };

    const handleDifficulty = (e) => {
        const { value } = e.target;

        setParams((prevParams) => ({
            ...prevParams,
            difficulty: value,
        }));
    };

    const handleType = (e) => {
        const { value } = e.target;

        setParams((prevParams) => ({
            ...prevParams,
            type: value,
        }));
    };

    const setData = () => {
        // console.log(params);
        props.getData(params);
    };

    const parentVariant = {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,

            transition: {
                duration: 0.5,
                staggerChildren: 0.2,
                delay: 1,
            },
        },
    };

    const selectVariant = {
        hidden: {
            opacity: 0,
            x: -100,
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 1,
                ease: 'linear',
            },
        },
    };

    return (
        <motion.div
            className="select-container d-flex flex-column align-items-center justify-content-center"
            variants={props.repeatAnimation ? '' : parentVariant}
            initial="hidden"
            animate="visible"
        >
            <motion.h3
                variants={props.repeatAnimation ? '' : selectVariant}
                className="heading mb-3"
            >
                Select Category:
            </motion.h3>

            <motion.select
                className="form-select mb-3 text-center"
                aria-label="Category select"
                onChange={handleCategory}
                value={params.category}
                variants={props.repeatAnimation ? '' : selectVariant}
            >
                <option value="0">Any</option>
                <option value="9">General Knowledge</option>
                <option value="10">Entertainment: Books</option>
                <option value="11">Entertainment: Film</option>
                <option value="12">Entertainment: Music</option>
                <option value="13">Entertainment: Musicals & Theatres</option>
                <option value="14">Entertainment: Television</option>
                <option value="15">Entertainment: Video Games</option>
                <option value="16">Entertainment: Board Games</option>
                <option value="17">Science & Nature</option>
                <option value="18">Science: Computers</option>
                <option value="19">Science: Mathematics</option>
                <option value="20">Mythology</option>
                <option value="21">Sports</option>
                <option value="22">Geography</option>
                <option value="23">History</option>
                <option value="24">Politics</option>
                <option value="25">Art</option>
                <option value="26">Celebrities</option>
                <option value="27">Animals</option>
                <option value="28">Vehicles</option>
                <option value="29">Entertainment: Comics</option>
                <option value="30">Science: Gadgets</option>
                <option value="31">Entertainment: Japanese Anime & Manga</option>
                <option value="32">Entertainment: Cartoon & Animations</option>
            </motion.select>

            <motion.h3 className="heading" variants={props.repeatAnimation ? '' : selectVariant}>
                Select Difficulty:
            </motion.h3>

            <motion.select
                className="form-select mb-3 text-center"
                aria-label="Default select example"
                onChange={handleDifficulty}
                value={params.difficulty}
                variants={props.repeatAnimation ? '' : selectVariant}
            >
                <option value="0">Any</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </motion.select>

            <motion.h3 className="heading" variants={props.repeatAnimation ? '' : selectVariant}>
                Select Type:
            </motion.h3>

            <motion.select
                className="form-select mb-3 text-center"
                aria-label="Default select example"
                onChange={handleType}
                value={params.type}
                variants={props.repeatAnimation ? '' : selectVariant}
            >
                <option value="0">Any</option>
                <option value="multiple">Multiple Choice</option>
                <option value="boolean">True / False</option>
            </motion.select>

            <motion.button
                className="btn btn-primary w-100 mb-3"
                onClick={setData}
                variants={props.repeatAnimation ? '' : selectVariant}
            >
                Continue
            </motion.button>

            <motion.button
                className="btn btn-primary w-100"
                onClick={props.showStatus}
                variants={props.repeatAnimation ? '' : selectVariant}
            >
                Show Stats
            </motion.button>
        </motion.div>
    );
}

export default Select;
