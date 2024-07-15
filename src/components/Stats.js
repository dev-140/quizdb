import React from 'react';

function Stats(props) {
    console.log(props.data);

    const accuray = ((props.data.correct / props.data.total) * 100).toFixed(2);

    return (
        <div className="status d-flex flex-column p-3">
            <h3 className="heading text-center">STATS</h3>
            <div className="d-flex row-stats mb-3 p-1 pb-2">
                <p className="text-center w-50 mb-0">Correct</p>
                <div className="vr"></div>
                <p className="text-center w-50 mb-0">{props.data.correct}</p>
            </div>
            <div className="d-flex row-stats mb-3 p-1 pb-2">
                <p className="text-center w-50 mb-0">Mistakes</p>
                <div className="vr"></div>
                <p className="text-center w-50 mb-0">{props.data.wrong}</p>
            </div>
            <div className="d-flex row-stats mb-3 p-1 pb-2">
                <p className="text-center w-50 mb-0">Total</p>
                <div className="vr"></div>
                <p className="text-center w-50 mb-0">{props.data.total}</p>
            </div>
            <div className="d-flex row-stats mb-3 p-1 pb-2">
                <p className="text-center w-50 mb-0">Accuray</p>
                <div className="vr"></div>
                <p className="text-center w-50 mb-0">{accuray}%</p>
            </div>
            <button className="btn btn-primary" onClick={props.back}>
                Back
            </button>
        </div>
    );
}

export default Stats;
