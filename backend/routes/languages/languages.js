const express = require('express');
const { body } = require('express-validator');
const languagesCotroller = require('../../controllers/languages/languages');

const router = express.Router();

//LANGUAGES

router.get('/languages-without-level', languagesCotroller.getLanguages);
router.get('/getLanguagesLevel', languagesCotroller.getLanguagesLevel);
router.get('/getEmployeeLanguage', languagesCotroller.getEmployeeLanguages);
router.get('/languages', languagesCotroller.getLanguagesWithLevel);
router.post('/create', languagesCotroller.create);
router.delete('/delete', languagesCotroller.delete);

module.exports = router;