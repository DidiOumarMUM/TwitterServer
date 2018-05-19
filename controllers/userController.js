const User = require('../model/user');

exports.user_list = function(req, res, next){
    User.find()
        .sort([['last_name', 'ascending']])
        .exec(function(err, list_users){
            if(err) return next(err);
            res.send(list_users) ;
            //res.render('user_list', {title: 'User List', user_list: list_users});
        });
}

exports.user_detail = function(req, res, next){
    User.findById(req.params.id).exec(function(err, user){
        console.log(user);
        if(err) return next(err);
        res.render('user_detail', {title: 'User Detail', user: user});
    });
}

exports.user_create_get = function(req, res){
    console.log('++++++++++++++');
    res.render('user_form', {title: 'Create User'});
}

exports.user_create_post = function(req, res, next){

    var user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        date_of_birth: req.body.date_of_birth,
        username: req.body.username,
        password: req.body.password
    });

    console.log('custom methods: ' + user.dudify());

    // user.save(function(err){
    //     if(err) return next(err);
    //     res.redirect('/users');
    // });
    user.save().then(function(){
        res.redirect('/users');
    }).catch(function(err){
        if(err) return next(err);
    });
};

exports.user_update_get = function(req, res, next){
    User.findById(req.params.id).exec(function(err, user){
        if(err) return next(err);

        if(user == null){
            console.debug('update error: ' + err);
            var err = new Error('User not found');
            err.status = 404;
            return next(err);
        }
        console.log(user);
        res.render('user_form', {title: 'Update User', user: user});
    });
}

exports.user_update_post = function(req, res, next){
    var user = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        date_of_birth: req.body.date_of_birth,
        username: req.body.username,
        password: req.body.password
    };
    
    User.findByIdAndUpdate({_id: req.body.uid}, user, {new: true}, function(err, doc){
        console.log(doc);
        if(err) return next(err);
        res.redirect('/users');
    });
}

exports.user_delete_post = function(req, res, next){
    User.findByIdAndRemove(req.params.id, function(err){
        if(err) return next(err);
        res.redirect('/users');
    });
}