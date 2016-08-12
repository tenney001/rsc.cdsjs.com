var myModule = angular.module('myApp',[
    // 'angular-momentjs'
])


myModule.controller('newsAdd',
    function ($scope) {
        $scope.news = {};
        $scope.newsTypeId = '';
        $scope.navTypeId = '';

        $scope.sub = function () {
            $scope.news = {
                id:$scope.newsid,
                title:$scope.title,
                newsType:$scope.newsTypeId,
                navType:$scope.navTypeId,
                describe:$scope.describe,
                content:ue.getContent()
            }
            // console.log('news:',$scope.news);
            if(!$scope.newsTypeId){
                alert('请选择新闻分类');
                return false;
            }
            $.post('/admin/api/news',$scope.news,function (data) {
                if(data.rs==1){
                    // alert(data.msg);
                    window.location.href = '/admin/news';
                }
            })
        };

        // 切换类别
        $scope.changeType = function (newsTypeId,navTypeId) {
            $scope.newsTypeId = newsTypeId;
            $scope.navTypeId = navTypeId;
        };
    }
);

