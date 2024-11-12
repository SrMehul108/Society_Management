import React from 'react';
import ProfileHeader from '../../../components/User/PersonalDetailsScreen/ProfileHeader';
import MembersSection from '../../../components/User/PersonalDetailsScreen/MemberSection';
import VehiclesSection from '../../../components/User/PersonalDetailsScreen/VehicleSection';
import MaintenanceSection from '../../../components/User/PersonalDetailsScreen/MaintenanceSection';
import AnnouncementsSection from '../../../components/User/PersonalDetailsScreen/AnnouncementsSection';
import MaintenanceDetails from '../../../components/User/PersonalDetailsScreen/MaintenanceDetails';
import DueMaintanance from '../../../components/User/PersonalDetailsScreen/DueMaintanance';

const UserPersonalDetail = () => {
    const ownerData = {
        name: 'Arlene McCoy',
        phone: '+91 91830 44537',
        email: 'ArleneMcCoy25@gmail.com',
        age: 20,
        gender: 'Male',
        relation: 'Father',
        wing: 'A',
        unit: '1001',
        image: '/path-to-profile-image.jpg', // Replace with actual image path
        documents: [
            { name: 'Syncfusion Essential Advanced Front Side.JPG', size: 1.5 },
            { name: 'Address Proof Front Side PDF', size: 1.8 },
        ],
    };
    const tenantData = {
        name: 'Arlene ',
        phone: '+91 91830 44537',
        email: 'ArleneMcCoy25@gmail.com',
        age: 2020,
        gender: 'FeMale',
        relation: 'Father',
        wing: 'b',
        unit: '1006',
        image: '/path-to-profile-image.jpg', // Replace with actual image path
        documents: [
            { name: 'Syncfusion Essential Advanced Front Side.JPG', size: 1.5 },
            { name: 'Address Proof Front Side PDF', size: 1.8 },
        ],
    };


    const members = [
        { name: 'Arlene McCoy', email: 'ArleneMcCoy@gmail.com', phone: '+91 91830 52221', age: 22, gender: 'Male', relation: 'Brother' },
        { name: 'Brooklyn Simmons', email: 'BrooklynSimmons@gmail.com', phone: '+91 92358 86413', age: 22, gender: 'Male', relation: 'Uncle' },
        { name: 'Arlene McCoy', email: 'ArleneMcCoy@gmail.com', phone: '+91 91830 52221', age: 22, gender: 'Male', relation: 'Brother' },
        { name: 'Brooklyn Simmons', email: 'BrooklynSimmons@gmail.com', phone: '+91 92358 86413', age: 22, gender: 'Male', relation: 'Uncle' },
        // Add more members as needed
    ];

    const vehicles = [
        { type: 'Two Wheelers', name: 'Splendor', number: 'GJ-3215' },
        { type: 'Four Wheelers', name: 'Fortuner', number: 'GJ-1216' },
        { type: 'Two Wheelers', name: 'Splendor', number: 'GJ-3215' },
        { type: 'Four Wheelers', name: 'Fortuner', number: 'GJ-1216' },
        // Add more vehicles as needed
    ];

    const maintenanceDetails = {
        pending: [
            { date: '11/04/2024', amount: 100, penalty: 200, total: 1250 },
            { date: '11/04/2024', amount: 100, penalty: 200, total: 1250 },
            // Add more as needed
        ],
        due: [
            { date: '11/04/2024', amount: 1000, total: 1250 },
            // Add more as needed
        ],
    };

    const announcements = [
        { name: 'Community initives', date: '01/02/2024', time: '10:25 AM', description: 'Ganesh Chaturthi celebration' },
        { name: 'Community initives', date: '01/02/2024', time: '10:25 AM', description: 'Ganesh Chaturthi celebration' },
        { name: 'Community initives', date: '01/02/2024', time: '10:25 AM', description: 'Ganesh Chaturthi celebration' },
        { name: 'Community initives', date: '01/02/2024', time: '10:25 AM', description: 'Ganesh Chaturthi celebration' },
        // Add more announcements as needed
    ];

    const maintenanceAmount = 1500;
    const penaltyAmount = 500;

    return (
        <div className="p-4 bg-gray-100">
            <ProfileHeader owner={ownerData}  tenant={tenantData} />
           
            <MembersSection members={members} />
            <VehiclesSection vehicles={vehicles} />
            <MaintenanceDetails maintenanceAmount={maintenanceAmount} penaltyAmount={penaltyAmount} />
            <MaintenanceSection />
            <DueMaintanance />
            <AnnouncementsSection announcements={announcements} />
        </div>
    );
};

export default UserPersonalDetail;
