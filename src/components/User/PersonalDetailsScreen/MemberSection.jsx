import React from 'react';

const MembersSection = ({ members }) => (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg md:text-xl font-semibold mb-4">Members: ({members.length})</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {members.map((member, index) => (
                <div key={index} className="border rounded-lg">
                    <div className="p-2 bg-blue-600 rounded-t-lg">
                        <h4 className="font-semibold text-white text-sm md:text-base">{member.name}</h4>
                    </div>
                    <div className="p-2 font-semibold text-sm md:text-base">
                        <div className="flex flex-wrap mb-2">
                            <div className="w-1/3"><p>Email:</p></div>
                            <div className="text-end w-2/3 break-words">{member.email}</div>
                        </div>
                        <div className="flex flex-wrap mb-2">
                            <div className="w-1/3"><p>Phone:</p></div>
                            <div className="text-end w-2/3 break-words">{member.phone}</div>
                        </div>
                        <div className="flex flex-wrap mb-2">
                            <div className="w-1/3"><p>Age:</p></div>
                            <div className="text-end w-2/3">{member.age}</div>
                        </div>
                        <div className="flex flex-wrap mb-2">
                            <div className="w-1/3"><p>Relation:</p></div>
                            <div className="text-end w-2/3">{member.relation}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default MembersSection;
