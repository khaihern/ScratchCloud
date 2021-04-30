require('dotenv')
const Scratch = require('scratch-api');
const Project = require('../models/projectModel');

exports.startCloudSessions = async () => {
  const projects = await Project.find().select('id');
  let projectIDs = [];
  for (i=0; i<projects.length; i++) {
    projectIDs.push(parseInt(projects[i].id));
  }
  console.log(projectIDs);
  projectIDs.forEach(connectCloudSessions);
}

const connectCloudSessions = async (projectID) => {
  Scratch.UserSession.create(process.env.SCRATCH_USERNAME, process.env.SCRATCH_PASSWORD, (err, user) => {
    user.cloudSession(projectID, (err, cloud) => {
      cloud.on('set', (name, value) => {
        console.log(projectID, name, value);
        if (name === '☁ port1') cloud.set(name, 200);
        //cloud.set(name, 400);
      });
    });
  });
}