var myModule = angular.module('myApp',[
    'angular-momentjs'
])


myModule.controller('newsType',
    function ($scope,$http,$moment) {
        $scope.showlist = false;
        $scope.list = [];
        $scope.pid = '';
        $scope.pname = '请选择';
        $scope.modelTitle = '添加分类';

        // 清除输入
        $scope.clear = function() {
            $('#newsTypeAdd')[0].reset();
        }
        // 添加回车事件
        $scope.enter = function(event) {
            if(event.keyCode == 13){
                $scope.save();
            }
        }
        // 改变父分类
        $scope.changeType = function(id,name) {
            $scope.pid = id;
            $scope.pname = name;
        }
        // 保存到服务端
        $scope.save = function () {
            if($scope.updateId){
                // 如果有updateid，则为修改
                $.post('/admin/api/newstype/update',{id:$scope.updateId,name:$scope.name,pid:$scope.pid},function(data) {
                    if(data.rs == 1){
                        $scope.clear();
                        $('#myModal').modal('hide');
                        $scope.getList();
                    }
                })
            }else{
                // 如果没有updateid，则为新增
                $.post('/admin/api/newstype/add',{name:$scope.name,pid:$scope.pid},function(data) {
                    if(data.rs == 1){
                        $scope.clear();
                        $('#myModal').modal('hide');
                        $scope.getList();
                    }else{
                        alert(data.msg);
                    }
                })
            }
        };
        // 异步读取数据
        $scope.getList = function () {
            $http({method:'GET',url:'/admin/api/newstype/list'}).success(function(data){
                // console.log(data);
                if(data.rs == 1){
                    var _list = data.data;
                    for(o in _list){
                        var obj = _list[o];
                        obj.meta.createAt = $moment(obj.meta.createAt).format('YYYY-MM-DD HH:MM:SS');
                        obj.meta.updateAt = $moment(obj.meta.updateAt).format('YYYY-MM-DD HH:MM:SS');
                        obj.pname = '';
                        if(obj.pid){
                            for(p in _list){
                                if(obj.pid == _list[p]._id){
                                    obj.pname = _list[p].name;
                                }
                            }
                        }
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
        // 添加按钮事件处理
        $scope.add = function() {
            $scope.updateId  = '';
            $scope.name = '';
            $scope.modelTitle = '添加分类';
        }
        // 修改按钮事件处理
        $scope.update = function (id) {
            if(id){
                $scope.updateId = id;
                for(item in $scope.list){
                    if($scope.list[item]._id == id){
                        $scope.name = $scope.list[item].name;
                        $scope.pid = $scope.list[item].pid;
                        $scope.pname = $scope.list[item].pname;
                        break;
                    }
                }
                $scope.modelTitle = '修改分类';
                $('#myModal').modal('show');
            }
        }
        // 删除按钮事件处理
        $scope.del = function(id) {
            if(id && confirm('确定要删除吗?')){
                $http({method:'post',url:'/admin/api/newstype/del',data:{id:id}}).success(function(data){
                    console.log(data);
                    if(data.rs == 1){
                        $scope.getList();
                    }
                })
            }
        }


        // 初次读取
        $scope.getList();

    }
);

