var express = require('express');
var router = express.Router();

const user_controller = require('../controllers/userController');

router.get('/', user_controller.user_list);

router.get('/detail/:id', user_controller.user_detail);
router.post('/authentification', user_controller.athentification);


//router.get('/create', user_controller.user_create_get);

router.post('/post', user_controller.user_create_post);

//router.get('/:id/update', user_controller.user_update_get);

router.post('/update/:id', user_controller.user_update_post);

router.get('/delete/:id', user_controller.user_delete_post);

module.exports = router;
