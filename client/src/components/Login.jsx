import React, { useState } from "react";

export const Login = (props) => {
    const [employName, setEmployName] = useState('');
    const [employEmail, setEmployEmail] = useState('');
    const [passwrd, setPasswrd] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Send request to the backend for authentication
        const response = await fetch('/api/v1/login/recruiter', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ employName, employEmail, passwrd })
        });

        // Call onLoginSuccess function from props upon successful authentication
        if (response.status === 200) {
            props.onLoginSuccess();
        } else {
            console.log('Authentication failed');
        }
    }

    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="employName">Employee Name: </label>
                <input value={employName} onChange={(e) => setEmployName(e.target.value)} type="text" placeholder="Employee name" id="employName" name="employName" />
                <br />
                <label htmlFor="employEmail">Employee Email: </label>
                <input value={employEmail} onChange={(e) => setEmployEmail(e.target.value)} type="text" placeholder="employeeEmail@me.com" id="employEmail" name="employEmail" />
                <br />
                <label htmlFor="password">Password: </label>
                <input value={passwrd} onChange={(e) => setPasswrd(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <br />
                <button type="submit">Login</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
        </div>
    )
}
