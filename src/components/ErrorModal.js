import React, { useState } from 'react';
import { motion } from 'framer-motion';

function ErrorModal(props) {
    const handleClose = () => {
        props.errVal('');
        props.back(false);
    };

    return (
        <motion.div className="error-modal" animate={{ y: props.animate ? 0 : -100, opacity: props.animate ? 1 : 0, display: props.animate ? 'block' : 'none' }}>
            <div className="container w-100 h-100">
                <div className="row align-items-center justify-content-center h-100">
                    <div className="col d-flex justify-content-center">
                        <div className="error-container p-2">
                            <h3 className="text-center mb-3">Network error</h3>

                            <button className="btn btn-secondary w-100" onClick={handleClose}>
                                Okay
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default ErrorModal;
