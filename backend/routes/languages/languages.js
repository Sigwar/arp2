const express = require('express');
const { body } = require('express-validator');
const authenticateToken = require('../../utils/authenticate');
const languagesCotroller = require('../../controllers/languages/languages');

const router = express.Router();

//LANGUAGES

router.get('/languages-without-level', [ authenticateToken, languagesCotroller.getLanguages ]);
router.get('/getLanguagesLevel', [ authenticateToken, languagesCotroller.getLanguagesLevel ]);
router.get('/getEmployeeLanguage', [ authenticateToken, languagesCotroller.getEmployeeLanguages ]);
router.get('/languages', [ authenticateToken, languagesCotroller.getLanguagesWithLevel ]);
router.post('/create', [ authenticateToken, languagesCotroller.create ]);
router.delete('/delete', [ authenticateToken, languagesCotroller.delete ]);

module.exports = router;