import React, { useState } from "react";

export const Register = (props) => {
    const [employName, setEmployName] = useState('');
    const [employEmail, setEmployEmail] = useState('');
    const [passwrd, setPasswrd] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare the registration data\
        const registrationData = {
            employName,
            employEmail,
            passwrd
        };

        // Sending registration data to back end
        try {
            const response = await fetch('/api/v1/register/recruiter', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registrationData)
            });

            console.log('Registration Data:', registrationData)

            if (response.status === 200) {
                console.log('Registration successful');
            } else {
                console.log('Registration failed');
            }
        } catch (error) {
            console.error('Error Messaging: There was an error', error);
        }
    }


    return (
        <div className="auth-form-container">
            <h2>Register</h2>
            <><form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="employName">Employee Name: </label>
                <input value={employName} onChange={(e) => setEmployName(e.target.value)} type="text" placeholder="Employee name" id="employName" name="employName" />
                <br></br>
                <label htmlFor="employEmail">Employee Email: </label>
                <input value={employEmail} onChange={(e) => setEmployEmail(e.target.value)} type="text" placeholder="employeeEmail@me.com" id="employEmail" name="employEmail" />
                <br></br>
                <label htmlFor="password">Password: </label>
                <input value={passwrd} onChange={(e) => setPasswrd(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <br></br>
                <button type="submit">Register</button>
            </form>
                <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button></>
        </div>
    )
};