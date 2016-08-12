var mongoose = require('mongoose');
var NewsTypeModel = require('../models/newsType');
var NewsType = mongoose.model('NewsType');
var NewsModel = require('../models/news');
var News = mongoose.model('News');
var EventProxy = require('eventproxy');



exports.index = function(req,res,next) {
    var ep = new EventProxy();
    ep.all(['firstNews','navNews','newsType'],function (oneNews,navNews,navTypes) {
        // console.log('navNews:',navNews);
        res.render('index',{
            title:'首页',
            oneNews:oneNews,
            navNews:navNews,
            navTypes:navTypes,
        });
    })

    // 获得首条新闻
    News.findOne(function(err,data){
        if(err){
            console.log('News.findOne err.',err);
        }
        if(data){
            ep.emit('firstNews',data);
        }
    });
    // 获取1级分类新闻
    NewsType.find({pid:''},function (err,types1) {
        if(err){
            console.log('NewsType.find err.',err);
        }
        ep.emit('newsType',types1);
        News
            .where('navType').in(types1)
            .exec(function (err,data) {
                if(err){
                    console.log('NewsType.find err.',err);
                }
                ep.emit('navNews',data);
            })
        // var obj = {};
        // for(i in types1){
        //     News.find({navType:types1[i]._id},function (err,data) {
        //         if(err){
        //             console.log('NewsType.find err.',err);
        //         }
        //         obj[types1[i].name] = data;
        //     });
        // }
        // ep.emit('navNews',obj);
    })
}