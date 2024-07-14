const data = {
    correct: 0,
    wrong: 0,
    toal: 0,
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
    // console.log(localStorage.getItem('userData'));
    return JSON.parse(localStorage.getItem('userData'));
};
