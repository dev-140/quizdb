import React from 'react';
import { delay, motion, stagger } from 'framer-motion';

function Header() {
    const frameVariants = {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,

            transition: {
                duration: 0.5,
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: {
            y: 0,
        },
        visible: {
            y: [0, 10, 0, -10, 0],
            transition: {
                duration: 0.5,
                ease: 'linear',
                repeat: Infinity,
                repeatDelay: 5,
            },
        },
    };

    const word = ['Q', 'U', 'I', 'Z', 'L', 'E', 'T'];

    return (
        <div className="header p-5 position-fixed w-100">
            <motion.div className="text-center mb-0 d-flex justify-content-center" variants={frameVariants} initial="hidden" animate="visible">
                {word.map((letter, index) => (
                    <motion.p key={index} variants={itemVariants}>
                        {letter}
                    </motion.p>
                ))}
            </motion.div>
        </div>
    );
}

export default Header;
