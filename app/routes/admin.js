var express = require('express');
var router = express.Router();
var News = require('../controllers/news');

router.use(function (req,res,next) {
    res.locals.setNavActive = function (url) {
        // console.log('url:',url);
        // console.log('host:',req.host);
        // console.log('path:','/admin'+req.path);
        var _path = '/admin'+req.path;
        // console.log('indexOf:',_path.indexOf(url));
        var result = '';
        if(_path.indexOf(url) >-1){
            result = 'active';
        }
        // console.log('result:',result);
        return result;
    }
    next();
})

/* Admin. */

// newstype list
router.get('/type', News.newsTypePage);

// api newsTypeList
router.get('/api/newstype/list',News.newsTypeList);

// api newsTypeAdd
router.post('/api/newstype/add', News.newsTypeAdd);

// api newsTypeUpdate
router.post('/api/newstype/update', News.newsTypeUpdate);

// api newsTypeDel
router.post('/api/newstype/del', News.newsTypeDel);

// newslist
router.get('/news',News.newsListPage);

// api newsList
router.get('/api/news/list',News.newsList);

// newsAddPage
router.get('/news/add',News.newsAddPage);

// api news add or update
router.post('/api/news',News.news);

// api newsDel
router.post('/api/news/del',News.newsDel);

// newsUpdatePage
router.get('/news/update/:id',News.newsUpdatePage);

module.exports = router;
