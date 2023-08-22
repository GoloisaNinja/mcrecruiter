# McCabe Recruiter Tool

Idea: End ghosting for candidates that are not selected for job placement.

## Getting Started

- type "npm run dev" from project root to start server
- type "npm run start" from root/client to start frontend
- notice the registration.txt file in the root -- this file contains registered users and will store new registrations that are submitted from the frontend
- a successful registration responds with status 200 - check console and network tabs in chrome dev tools
- a successful login responds with status 200 and the user email and password - check console and network tabs in chrome dev tools
- try registering a new user and then checking for new user in registration.txt file
- try logging in with good email/bad password to receive a 404
- successful login renders CandidateInfo jsx component
- notice the proxy in the client package.json - this allows for cleaner call to backend in fetch