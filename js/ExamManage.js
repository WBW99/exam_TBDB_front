$(function (){
    reLoad();
})
function reLoad(){
    //查询所有考试
    let url = "http://localhost:8080/UtroTestSSM/queryExamPaper";
    $("#exam_table").bootstrapTable({
        url:url,
        method:"POST",
        dataType:'JSON',
        striped:true,
        pageNumber:1,
        pagination:true,
        sidePagination:'server',
        pageSize:10,
        queryParams:function(params){
            //上传服务器参数
            var temp={
                offset:params.offset,
                pageNumber:params.limit,
                // acc:localStorage.getItem("acc")
            };
            return JSON.stringify(temp);
        },
        columns:[
            {
                title:'id',
                align:"center",
                halign:"center",
                field:"id"
            },{
                title: "试卷名",
                align: "center",
                halign: "center",
                field: "examname"
            },{
                title: "考试时间",
                align: "center",
                halign: "center",
                field: "examtime"
            },{
                title: "开始时间",
                align: "center",
                halign: "center",
                field: "starttime"
            },{
                title: "结束时间",
                align: "center",
                halign: "center",
                field: "endtime"
            },{
                title: "创建时间",
                align: "center",
                halign: "center",
                field: "createtime"
            },{
                title: "功能",
                align: "center",
                halign: "center",
                width:'100px',
                formatter:function (value,row,index){
                    let a = '<a href="javascript:void(0);" onclick="removeInfo(\''+row.id+'\')">删除</a>'
                }
            }
        ]
    })
}
//删除按钮
function removeInfo(id){
    let jsonData={};
    jsonData.id=id;
    $.ajax({
        url:"http://localhost:8080/UtroTestSSM/deleteTest",
        type:"post",
        contentType:"application/json",
        dataType:"json",
        data:JSON.stringify(jsonData),
        success:function (result){
            if (result){
                reLoad()
            }else {
                alert("操作失败!")
            }

        }
    })
}
