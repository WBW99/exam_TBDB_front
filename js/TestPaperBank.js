$(function (){
    reload();
})

function reload(){
    let url = "http://localhost:8080/UtroTestSSM/queryAllExamPaper";
    $("#testpaperbank").bootstrapTable({
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
                title: 'id',
                align: "center",
                halign: "center",
                field: "id"
                /* formatter:function (value,row,index){
                     return index+1;
                 }*/

            },{
                title:'试卷标题',
                align:"center",//水平居中
                halign:"center",//垂直居中
                field: 'examname'
            },
            {
                title:'创建时间',
                align:"center",//水平居中
                halign:"center",//垂直居中
                field:'createtime'

            },{
                title:'管理',
                align:"center",//水平居中
                halign:"center",//垂直居中
                width: '300px', // 列宽
                formatter:function (value,row,index){
                    //若将来 设计到字符串数据传入参数，需要设置单引号
                    let a = '<a href="javascript:void(0);" onclick="removeExam(\''+row.id+'\')">删除</a>'
                    let b ='<a href="javascript:void(0);" onclick="layerClick()" onclick="modifyInfo(\''+row.id+'\',\''+row.examname+'\',\''+row.createtime+'\'"></a>'
                    let c = '<a href="javascript:void(0);" onclick="setExam(\''+row.id+'\')">试题设置</a>'
                }

            }]
    })
}