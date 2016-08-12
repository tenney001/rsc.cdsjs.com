var express = require('express');
var router = express.Router();
var IndexController = require('../controllers/index');
var mongoose = require('mongoose');
var NewsTypeModel = require('../models/newsType');
var NewsType = mongoose.model('NewsType');
var Moment = require('moment')


router.use(function (req,res,next) {
    res.locals.moment = function (t) {
        return Moment(t).format('YYYY-MM-DD');
    }
    res.locals.setCurrentNav = function (url) {
        var _path = req.path;
        var result = '';
        if(_path.indexOf(url) >-1){
            result = 'current';
        }
        // console.log('result:',result);
        return result;
    }

    var _newstypes = [];
    NewsType
        .find({pid:''})
        .exec(function (err,newstypes) {
            if(err){
                console.log('NewsType.find err.',err);
                next();
            }
            if(newstypes && newstypes.length>0){
                _newstypes = newstypes;
            }
            // console.log('_newstypes:',_newstypes);
            res.locals.getHomeNavList =  _newstypes;
            next();
        });
    
})

/* GET home page. */
router.get('/', IndexController.index);


module.exports = router;
