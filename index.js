const Intern = require("./lib/Intern");
const Engineer = require("./lib/Engineer");
const Manager = require("./lib/Manager");

const inquirer = require("inquirer");
const fs = require("fs");

let memberArray = [];

function startApp() {
    startHtml();
    addTeamMember();
}

function addTeamMember() {
    inquirer.prompt([{
        type: "input",
        message: "What is the team members name?",
        name: "name"
    },
    {
        type: "list",
        message: "What is the team members role?",
        name: "role",
        choices: [
            "Intern",
            "Engineer",
            "Manager"
        ]
    },
    {
        type: "input",
        message: "What is the team members ID?",
        name: "id"
    },
    {
        type: "input",
        message: "What is the team members Email?",
        name: "email"
    }])

        .then(function ({ name, role, id, email }) {
            let roleInfo = "";
            if (role === "Engineer") {
                roleInfo = "What is their GitHub Username?";
            } else if (role === "Intern") {
                roleInfo = "What is their school name?";
            } else {
                roleInfo = "What is their office number?";
            }
            inquirer.prompt([{
                message: `${roleInfo}`,
                name: "roleInfo"
            },
            {
                type: "list",
                message: "Would you like to add more team members?",
                choices: [
                    "yes",
                    "no"
                ],
                name: "moreMembers"
            }])
                .then(function ({ roleInfo, moreMembers }) {
                    let newMember;
                    if (role === "Intern") {
                        newMember = new Intern(name, id, email, roleInfo);
                    } else if (role === "Engineer") {
                        newMember = new Engineer(name, id, email, roleInfo);
                    } else {
                        newMember = new Manager(name, id, email, roleInfo);
                    }
                    memberArray.push(newMember);
                    addHtml(newMember)
                        .then(function () {
                            if (moreMembers === "yes") {
                                addTeamMember();
                            } else {
                                finishHtml();
                            }
                        });

                });
        });
}

function startHtml() {
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <title>Team Profile</title>
    </head>
    <body>
        <nav class="navbar navbar-dark mb-5 bg-danger">
            <span class="navbar-brand mb-0 h1 w-100 text-center">Team Profile</span>
        </nav>
        <div class="container">
            <div class="row">`;
    fs.writeFile("./output/team.html", html, function (err) {
        if (err) {
            console.log(err);
        }
    });
    console.log("Team Profile Generator");
}

function addHtml(member) {
    return new Promise(function (resolve, reject) {
        const name = member.getName();
        const role = member.getRole();
        const id = member.getId();
        const email = member.getEmail();
        let data = "";
        if (role === "Engineer") {
            const gitHub = member.getGitHub();
            data = `<div class="col-6">
           <div class="card mx-auto mb-3 bg-primary" style="width: 18rem b">
           <h5 class="card-header">${name}<br /><br />Engineer</h5>
           <ul class="list-group list-group-flush">
               <li class="list-group-item">ID: ${id}</li>
               <li class="list-group-item">Email Address: ${email}</li>
               <li class="list-group-item">GitHub: ${gitHub}</li>
           </ul>
           </div>
       </div>`;
        } else if (role === "Intern") {
            const school = member.getSchool();
            data = `<div class="col-6">
           <div class="card mx-auto mb-3 bg-primary" style="width: 18rem">
           <h5 class="card-header">${name}<br /><br />Intern</h5>
           <ul class="list-group list-group-flush">
               <li class="list-group-item">ID: ${id}</li>
               <li class="list-group-item">Email Address: ${email}</li>
               <li class="list-group-item">School: ${school}</li>
           </ul>
           </div>
       </div>`;
        } else {
            const officeNumber = member.getOfficeNumber();
            data = `<div class="col-6">
           <div class="card mx-auto mb-3 bg-primary" style="width: 18rem">
           <h5 class="card-header">${name}<br /><br />Manager</h5>
           <ul class="list-group list-group-flush">
               <li class="list-group-item">ID: ${id}</li>
               <li class="list-group-item">Email Address: ${email}</li>
               <li class="list-group-item">Office Number: ${officeNumber}</li>
           </ul>
           </div>
    </div>`
        }
        console.log("Adding member...");
        fs.appendFile("./output/team.html", data, function (err) {
            if (err) {
                return reject(err);
            };
            return resolve();
        });
    });
}

function finishHtml() {
    const html = ` </div>
    </div>
    
</body>
</html>`;

    fs.appendFile("./output/team.html", html, function (err) {
        if (err) {
            console.log(err);
        };
    });
    console.log("Finished HTML");
}

startApp();