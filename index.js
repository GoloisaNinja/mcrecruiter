const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const publicPath = path.join(__dirname, 'client', 'build');

// -- DONT WORRY TOO MUCH ABOUT THIS SECTION ROBERT
// -- I AM BASICALLY WRITING TO A FILE VS USING A DB AS JUST A
// -- QUICK TEST/PROOF OF CONCEPT IF I CAN REACH MY SERVER AND WRITE SOME DATA
const util = require('util');
const stream = require('stream');
const fs = require('fs');
const once = require('events');
const readline = require("readline");
const events = require("events");
// turn stream.finish from callback to promise
const finished = util.promisify(stream.finished);

async function writeToFile(iterable, filePath) {
    const writeable = fs.createWriteStream(filePath, {encoding: "utf8", flags: "a"});
    for await (const chunk of iterable) {
        if (!writeable.write(chunk)) {
            await once(writeable, 'drain');
        }
    }
    writeable.end();
    await finished(writeable);
}
async function readFileForUser(email, password) {
    try {
        const rl = readline.createInterface({
            input: fs.createReadStream("registration.txt", "utf8"),
            crlfDelay: Infinity
        });
        let user = {error: "not found"};
        rl.on('line', (line) => {
            const creds = line.split(",");
            // format is name,email,passowrd
            if (creds[1] === email) {
                if (creds[2] === password) {
                    user = {
                        email: creds[1],
                        password: creds[2]
                    }
                    rl.close();
                }
            }
        });
        await events.once(rl, 'close');
        return user;
    } catch(e) {
        console.log(e);
        return { error: e};
    }
}

// -- END WRITE STREAM TO FILE SECTION -- //

// Create app
const corsOptions = {
    origins: [
        "http://localhost:3000",
    ],
    optionsSuccessStatus: 200,
    methods: ["POST", "GET", "DELETE"]
};
const app = express();
app.use(express.json());
app.use(cors(corsOptions));

// Middleware

// DB

// Serve Frontend Assets / Fallback
if (process.env.NODE_ENV === "production") {
    app.use(express.static('client/build'));
    // catch-all
    app.get("*", (req, res) => {
        res.sendFile(path.join(publicPath, 'index.html'));
    })
}

// Routes

// Register route - write to registration.txt
app.post("/api/v1/register/recruiter", async (req, res) => {
    const {employName, employEmail, passwrd} = req.body;
    const data = "\n" + employName + "," + employEmail + "," + passwrd;
    try {
        await writeToFile(data, "registration.txt");
        res.status(200).json({message: "Registration complete"});
    } catch(e) {
        res.status(500).json({message: e});
    }

})

// Login route - read from registration.txt
app.post("/api/v1/login/recruiter", async(req, res) => {
    const {employName, employEmail, passwrd} = req.body;
    try {
        const user = await readFileForUser(employEmail, passwrd);
        console.log(user);
        if (!user.hasOwnProperty("error")) {
            return res.status(200).json(user);
        } else if (user.error === "not found") {
            return res.status(404).json({message: "user not found"});
        }
    } catch(e) {
        console.log(e);
        res.status(500).json({message: e});
    }
})

// Port
const PORT = process.env.PORT || 5000;

// Listen
app.listen(PORT,() => {
    console.log(`Server is up on: ${PORT}`)
})