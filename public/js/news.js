var myModule = angular.module('myApp',[
    'angular-momentjs'
])


myModule.controller('news',
    function ($scope,$http,$moment) {
        $scope.showlist = false;
        $scope.list = [];

        // 异步读取数据
        $scope.getList = function () {
            $http({method:'GET',url:'/admin/api/news/list'}).success(function(data){
                // console.log(data);
                if(data.rs == 1){
                    var _list = data.data;
                    for(o in _list){
                        _list[o].meta.createAt = $moment(_list[o].meta.createAt).format('YYYY-MM-DD HH:mm:ss');
                        _list[o].meta.updateAt = $moment(_list[o].meta.updateAt).format('YYYY-MM-DD HH:mm:ss');
                    }
                    if(_list.length>0){
                        $scope.showlist = true;
                    }else{
                        $scope.showlist = false;
                    }
                    $scope.list = _list;
                }
            })
        };
        // 修改按钮事件处理
        $scope.update = function (id) {
            console.log('url:','/admin/news/update/'+id);
            if(id){
                window.location.href = '/admin/news/update/'+id;
            }else{
                alert('参数错误');
            }   
        }
        // 删除按钮事件处理
        $scope.del = function(id) {
            if(id && confirm('确定要删除吗?')){
                $http({method:'post',url:'/admin/api/news/del',data:{id:id}}).success(function(data){
                    console.log(data);
                    if(data.rs == 1){
                        $scope.getList();
                    }
                })
            }
        }
        // 添加按钮事件处理
        $scope.add = function () {
            window.location.href = '/admin/news/add'
        }


        // 初次读取
        $scope.getList();

    }
);

