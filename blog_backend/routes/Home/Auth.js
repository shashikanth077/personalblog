const express = require('express');
const router = express.Router();
const HomeController = require('../../controller/Home/PersonalController');
const AboutController = require('../../controller/About/AboutController');
const ContactController = require('../../controller/Contact/ContactController');
const ServicesController = require('../../controller/Services/ServicesController');
const BlogController = require('../../controller/Blog/BlogController');

router.get('/getPersonalData',HomeController.getPersonalDetails);
router.get('/getSkills',AboutController.getUserSkills);
router.get('/getServices',ServicesController.getServices);
router.get('/getBlogs',BlogController.getBlogs);

module.exports = router;