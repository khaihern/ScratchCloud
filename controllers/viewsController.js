const User = require('../models/userModel');
const Project = require('../models/projectModel');

exports.getDashboard = async (req, res) => {
  const projects = await Project.find({ id: { $in: req.user.projects } }).select('id name');
  //console.log(projects);
  res.status(200).render('app.ejs', {
    title: 'welcome',
    username: req.user.username,
    projects: projects
  });
}

exports.newProject = async (req, res) => {
  const projects = await Project.find({ id: { $in: req.user.projects } }).select('id name');

  res.status(200).render('app.ejs', {
    title: 'newProject',
    username: req.user.username,
    projects: projects
  })
}

exports.getProject = async (req, res) => {
  const projects = await Project.find({ id: { $in: req.user.projects } }).select('id name');
  const projectData = await Project.findOne({ id: req.params.id });

  res.status(200).render('app.ejs', {
    title: req.params.tab,
    username: req.user.username,
    projects: projects,
    projectData: projectData
  })
}


exports.getRegistration = (req, res) => {
  res.status(200).render('register.ejs');
}

exports.getLogin = (req, res) => {
  res.status(200).render('login.ejs');
}
