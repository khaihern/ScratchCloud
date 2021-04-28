const Project = require('../models/projectModel');
const User = require('../models/userModel');

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res
      .status(200)
      .json({
        status: 'success',
        results: projects.length,
        data: {
          projects
        }
      });
  } catch (err) {
    res
      .status(404)
      .json({
        status: 'fail',
        message: err
      });
  }
}

exports.createProject = async (req, res) => {
  try {
    console.log(req.body.projectID);
    const project = new Project({
      id: req.body.projectID,
      name: req.body.projectName,
    });
    console.log(project);
    await project.save();

    req.user.projects.push(req.body.projectID);
    await req.user.save();

    res.status(200).redirect('/app');
  } catch (err) {
    res
      .status(400)
      .json({
        status: 'fail',
        message: err
      });
  }
}

exports.createDocument = async (req, res) => {
  try {
    const document = {
      key: req.body.field,
      value: req.body.value
    };

    const projectData = await Project.findOne({ id: req.params.id });
    projectData.collections.push(document);    
    await projectData.save();

    res.status(200).redirect('back');
    
  } catch (err) {
    res
      .status(400)
      .json({
        status: 'fail',
        message: err
      });
  }
}

exports.deleteDocument = async (req, res) => {
  try {
    console.log('deleting document...');
    const projectData = await Project.findOne({ id: req.params.id });
    await projectData.save();
    res.status(200).json({ status: 'success' });
  } catch (err) {
    res
      .status(404)
      .json({
        status: 'fail',
        message: err
      });
  }
}