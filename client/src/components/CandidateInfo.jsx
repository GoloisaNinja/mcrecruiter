import React, { useState } from 'react';

function CandidateInfo() {
    const [candidFirstName, setCandidFirstName] = useState('');
    const [candidLastName, setCandidLastName] = useState('');
    const [candidEmailAddr, setCandidEmailAddr] = useState('');
    const [candidPhoneNum, setCandidPhoneNum] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(candidEmailAddr);
    }

    return (
        <div className="candidContainer">
            <h1>Candidate Information</h1>
            <h2>Please enter candidate information for weekly non-interview email</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>First Name:</label>
                    <input type="text" name="tfFirstName" id="tfFirstName" placeholder="First Name" />
                </div>
                <div className="form-group">
                    <label>Last Name:</label>
                    <input type="text" name="tfLastName" id="tfLastName" placeholder="Last Name" />
                </div>
                <div className="form-group">
                    <label>Email Address:</label>
                    <input type="text" name="tfCandidEmailAddr" id="tfCandidEmailAddr" placeholder="Email Address" />
                </div>
                <div className="form-group">
                    <label>Phone Number:</label>
                    <input type="number" name="numCandidPhoneNum" id="numCandidPhoneNum" placeholder="Phone Number" />
                </div>
                <div className="text-center">
                    <button type="submit">Submit</button>
                    <button type="reset">Clear</button>
                </div>
            </form>
        </div>
    );
}

export default CandidateInfo;