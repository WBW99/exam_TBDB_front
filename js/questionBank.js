$(function (){
    reLoad();
})

//  问题：bootstraptable如何携带要传输的数据回后端，依据扫描数据库
function reLoad(){
    let url = BASIC_URL+"selectAllQuestion";
    $("#myTable").bootstrapTable({
        url:url,
        method:'POST',
        dataType:'JSON',
        striped:true, //是否显示行间隔色
        pageNumber:1, //初始化加载第一页
        pagination:true, //是否分页
        sidePagination: 'server', //分页
        pageSize:10, //单页记录数
        queryParams: function (params){
            //上传到服务器的参数
            var temp = {
                offset: params.offset, //sql语句起使索引
                pageNumber: params.limit  //每页显示的数量
            };
            return JSON.stringify(temp);
        },
        columns:[
            {
                title: 'id',
                align: "center",
                halign: "center",
                field: "id"
               /* formatter:function (value,row,index){
                    return index+1;
                }*/

            },{
            title:'科目',
            align:"center",//水平居中
            halign:"center",//垂直居中
            field: 'subject'
        },{
                title:'题干',
                align:"center",//水平居中
                halign:"center",//垂直居中
                field:'stem'

            },
            {
                title:'答案',
                align:"center",//水平居中
                halign:"center",//垂直居中
                field:'answer'

            },{

                title:'分值',
                align:"center",//水平居中
                halign:"center",//垂直居中
                field:'score'

            },
            {
                title:'类型',
                align:"center",//水平居中
                halign:"center",//垂直居中
                field:'type'

            },{
                title: '创建时间',
                align:"center",//水平居中
                halign:"center",//垂直居中
                field: 'createtime'
            },{
                title: '功能',
                align: "center",
                halign: "center",
                width: '100px', // 列宽
                formatter:function (value,row,index){
                    //若将来 设计到字符串数据传入参数，需要设置单引号
                    let a = '<a href="javascript:void(0);" onclick="removeInfo(\''+row.id+'\')">删除</a>'
                    let b ='<a href="javascript:void(0);" onclick="layerClick()" onclick="modifyInfo(\''+row.id+'\',\''+row.stem+'\',\''+row.answer+'\',\''+row.score+'\',\''+row.type+'\',\''+row.createtime+'\'"></a>'
                }

            }]
    })
}
//删除功能
function removeInfo(id){
    let jsonData = {};
    jsonData.id = id;
    $.ajax({
        url:BASIC_URL+"deleteQuestion",
        type:"post",
        contextType:"application/json",
        dataType: "json",
        data:JSON.stringify(jsonData),
        success:function (result){
            if (result){
                reLoad();
            }else{
                alert("操作失败！")
            }
        }

    })
}

//修改内容
function layerClick(){
    layer.open({
        type:2,
        title:'修改内容',
        maxmin:false,
        shadeClose: false,
        area:['80%','80%'],//弹出层宽高
        content:'修改题目.html',//设置弹出层打开的页面
    });
}




