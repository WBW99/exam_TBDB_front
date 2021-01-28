$(function (){
    reload();
})

function reload(){
    let url = "http://localhost:8080/UtroTestSSM/selectAllQuestion";
    $("#selectQuestionTable").bootstrapTable({
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
                     return '<input type="checkbox" class="select" value="\''+row.id+'\'"/>';
                     // return index+1;
                 }

            },
            // {
            //     title: 'id',
            //     align: "center",
            //     halign: "center",
            //     field: "id"
            //     /* formatter:function (value,row,index){
            //          return index+1;
            //      }*/
            //
            // },
               {
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
            }]
    })
}