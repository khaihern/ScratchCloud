const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');
const projectController = require('../controllers/projectController');

const router = express.Router();


router.get('/app', authController.checkAuthenticated, viewsController.getDashboard);
router.get('/app/newproject', authController.checkAuthenticated, viewsController.newProject);

router.get('/app/:id/:tab', authController.checkAuthenticated, viewsController.getProject);
router.post('/app/:id/collections', authController.checkAuthenticated, projectController.createDocument);

router.get('/register', authController.checkNotAuthenticated, viewsController.getRegistration);
router.get('/login', authController.checkNotAuthenticated, viewsController.getLogin);
router.delete('/logout', authController.logout);


module.exports = router;
