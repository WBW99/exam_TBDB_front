$(function (){
    reload();
})

function reload(){
    let url = "http://localhost:8080/exam_TBDB_SSM2/selectRelatedQestion";
    $("#selectAll").bootstrapTable({
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
            let temp = {
                offset: params.offset, //sql语句起使索引
                pageNumber: params.limit  //每页显示的数量
            };
            return JSON.stringify(temp);
        },
        columns:[
            {
                // title: 'id',
                align: "center",
                halign: "center",
                field: "id",
                formatter:function (value,row,index){
                    return '<input type="checkbox" class="select1" value="\''+row.id+'\'"/>';
                     // return index+1;
                 }

            },{
                title:'题型',
                align:"center",//水平居中
                halign:"center",//垂直居中
                field:'type'

            },{
                title:'题干',
                align:"center",//水平居中
                halign:"center",//垂直居中
                field: 'stem'
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

            },{
                title:'管理',
                align:"center",//水平居中
                halign:"center",//垂直居中
                width: '300px', // 列宽
                formatter:function (value,row,index){
                    //若将来 设计到字符串数据传入参数，需要设置单引号
                    let a = '<a href="javascript:void(0);" onclick="removeInfo(\''+row.id+'\')">删除</a>'
                    let b ='<a href="javascript:void(0);" onclick="layerClick()" onclick="modifyInfo(\''+row.id+'\',\''+row.type+'\',\''+row.stem+'\',\''+row.answer+'\',\''+row.score+'\'"></a>'
                }

            }]
    })
}

function removeExam(){
    let jsonData={};
    jsonData.id=id;
    $.ajax({
        url:"http://localhost:8080/exam_TBDB_SSM2/deleteExam",
        type:"post",
        contentType:"application/json",
        dataType: "json",
        data:JSON.stringify(jsonData),
        success:function (result){
            if (result){
                reload();
            }else{
                alert("删除失败！！！")
            }
        }
    })
}