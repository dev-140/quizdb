const data = {
    correct: 0,
    wrong: 0,
    total: 0,
};

export const setDataLocal = () => {
    if (localStorage.getItem('userData') === null) {
        localStorage.setItem('userData', JSON.stringify(data));
        console.log(localStorage.getItem('userData'));
    }
};

export const handleUserData = (setUserData) => {
    localStorage.setItem('userData', JSON.stringify(setUserData));
};

export const fetchUserData = () => {
    // console.log(JSON.parse(localStorage.getItem('userData')));
    return JSON.parse(localStorage.getItem('userData'));
};

const fetchToken = async () => {
    try {
        const response = await fetch('https://opentdb.com/api_token.php?command=request');
        const data = await response.json();
        if (data.response_code === 0) {
            const token = data.token;
            localStorage.setItem('triviaToken', token);
        } else {
            console.error('Failed to fetch token:', data.response_message);
        }
    } catch (error) {
        console.error('Error fetching token:', error);
    }
};

export const createSessionTime = (time) => {
    const date = new Date();

    localStorage.setItem('tokenTimeStarted', date);

    // console.log(`prev total time ${time} new session created ${}`);
};

export const getCurrTime = () => {
    const date = new Date();
    const timeStarted = new Date(localStorage.getItem('tokenTimeStarted'));

    const diffTime = date - timeStarted;
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));

    // if (diffHours >= 6) {
    createSessionTime(diffHours);
    // } else {
    //     console.log(`session valid, total time: ${diffHours}`);
    // }
};
