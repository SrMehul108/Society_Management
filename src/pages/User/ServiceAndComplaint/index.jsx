import React from 'react';
import ComplaintSubmission from '../../../components/User/ServiceAndComplaint/Complaint/ComplaintSubmission';

const UserComplaintSubmission = () => {
    const complaintData = [
        {
            id: 1,
            title: "Parking Facilities",
            date: "01/07/2021",
            status: "open",
            description: "The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesa in...",
        },
        {
            id: 2,
            title: "Community Center",
            date: "01/07/2021",
            status: "open",
            description: "The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesa in...",
        },
        {
            id: 3,
            title: "Swimming Pool",
            date: "01/07/2021",
            status: "open",
            description: "The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesa in...",
        },
    ];

    const requestData = [
        {
            id: 1,
            title: "Community Center",
            date: "01/07/2021",
            status: "slove",
            description: "The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesa in...",
        },
        {
            id: 2,
            title: "Community Center",
            date: "01/07/2021",
            status: "open",
            description: "The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesa in...",
        },
        {
            id: 3,
            title: "Swimming Pool",
            date: "01/07/2021",
            status: "open",
            description: "The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesa in...",
        },
    ];

    return (
        <div className="bg-gray-100">
            <ComplaintSubmission complaint={complaintData} request={requestData} />
        </div>
    );
};

export default UserComplaintSubmission;
