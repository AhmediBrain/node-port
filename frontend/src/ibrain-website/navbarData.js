import logo from '../images/ibrain-logo.png';

export const navbarData = {
    logo: {
        src: logo,
        alt: 'Ibrain Logo'
    },
    sections: [
        {
            title: 'Academy',
            subsections: [
                {
                    title: 'Programs',
                    link: '/programs'
                },
                {
                    title: 'Services',
                    link: '/services'
                },
                {
                    title: 'Class Environment',
                    link: '/class-environment'
                },
                {
                    title: 'Parent Support & Counseling',
                    link: '/parent-support'
                },
                {
                    title: 'Resources',
                    link: '/resources'
                },
                {
                    title: 'Academic Calendar',
                    link: '/academic-calendar'
                },
                {
                    title: 'Admissions',
                    link: '/admissions'
                }
            ]
        },
        {
            title: 'Institute',
            subsections: [
                {
                    title: 'Research Pipeline',
                    link: '/research-pipeline'
                },
                {
                    title: 'Continued Education',
                    link: '/continued-education'
                },
                {
                    title: 'Guest Speaker Program',
                    link: '/guest-speaker'
                },
                {
                    title: 'Publications',
                    link: '/publications'
                }
            ]
        }
    ]
};