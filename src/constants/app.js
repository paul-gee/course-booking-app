export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000';
export const NULL_USER = { id: null, isAdmin: false };

export const HOME_HIGHLIGHTS = [
    {
        image: require('../images/schedule.png'),
        alt: 'Schedule',
        title: 'Pick Your Schedule',
        message: 'Choose whether to go through the course quickly if your schedule allows or take a slower pace of classes to balance your studies with other obligations.'
    },
    {
        image: require('../images/homestudy.png'),
        alt: 'Home Study',
        title: 'Study at Home',
        message: 'Attend classes at the comfort of your home. Avoid the hassle and expense of traveling to a physical location and instead focus on your learnings.'
    },
    {
        image: require('../images/projects.png'),
        alt: 'Projects',
        title: 'Build Projects',
        message: 'Gain hands-on experience on project building and improve your skills. Develop your own solutions and approaches and apply them in a tangible way.'
    },
]