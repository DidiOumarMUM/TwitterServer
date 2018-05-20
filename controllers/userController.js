const User = require('../model/user');
const encrypt=require('../crypto/crypto')
const jwt = require('jsonwebtoken') ;
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
        return user ;
    //res.render('user_detail', {title: 'User Detail', user: user});
    });
}

exports.athentification = function(req, res, next){
    console.log("here authentification")
    console.log(encrypt(req.body.password));
    User.find({username : req.body.username , password : encrypt(req.body.password)})
        .exec(function(err, user){
            console.log(user) ;
            if(err) return next(err);  
            console.log(req.body); 
            let payload = {subject : user._id} ;
            let token = jwt.sign(payload , 'secretKey') ;
        res.send({'token' : token , 'user' : user}) ;  
           // res.send(JSON.stringify(list_users)) ;
            //res.render('user_list', {title: 'User List', user_list: list_users});
        });
}

/*exports.user_create_get = function(req, res){
    console.log('++++++++++++++');
    res.render('user_form', {title: 'Create User'});
}*/

exports.user_create_post = function(req, res, next){

    var user = new User({
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        date_of_birth: req.body.date_of_birth,
        username: req.body.username,
        password: req.body.password
    });
 console.log(user) ;
    //console.log('custom methods: ' + user.dudify());

    // user.save(function(err){
    //     if(err) return next(err);
    //     res.redirect('/users');
    // });
    user.save().then(function(){
        //res.redirect('/users');
         /*let payload = {subject : user._id} ;
         let token = jwt.sign(payload , 'secretKey') ;
          console.log(token) ;*/
        //res.send({token}) ; 
       res.send()
        
    }).catch(function(err){
        if(err) return next(err);
    });
};



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
        //res.redirect('/users');
        res.send(doc) ;
    });
}

exports.user_delete_post = function(req, res, next){
    User.findByIdAndRemove(req.params.id, function(err){
        if(err) return next(err);
        res.redirect('/users');
    });


  
        
    
}