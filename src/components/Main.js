import React, { useState, useEffect } from 'react';
import Select from './Select';

const DataFetchingComponent = () => {
    return (
        <div className="container  main-container pt-5">
            <div className="row d-flex align-items-center justify-content-center">
                <div className="col-12 col-md-5">
                    <h1 className="text-center">QUIZLET</h1>
                    <div className="box p-4">
                        <Select></Select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataFetchingComponent;
