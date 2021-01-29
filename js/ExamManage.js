$(document).ready(reLoad())

function reLoad(){
    //查询所有考试
    let url = "http://localhost:8080/exam_TBDB_SSM2/queryAllExamPaper";
    $("#exam_table").bootstrapTable({
        url:url,
        method:'POST',
        dataType:'JSON',
        striped:true, //是否显示行间隔色
        pageNumber:1, //初始化加载第一页
        pagination:true, //是否分页
        sidePagination: 'server', //分页
        pageSize:10, //单页记录数
        queryParams:function(params){
            //上传服务器参数
            var temp={
                offset: params.offset, //sql语句起使索引
                pageNumber: params.limit, //每页显示的数量
                acc:localStorage.getItem("acc")
            };
            return JSON.stringify(temp);
        },
        columns:[
            {
                title:'id',
                align:"center",
                halign:"center",
                field: 'id'
               /* formatter:function (value, row, index){
                    return index+1
                }*/
            },{
                title: '试卷名',
                align: "center",
                halign: "center",
                field: 'examname'
            },{
                title: '考试时间',
                align: "center",
                halign: "center",
                field: 'examtime'
            },{
                title: '开始时间',
                align: "center",
                halign: 'center',
                field: "starttime"
            },{
                title: '结束时间',
                align: "center",
                halign: "center",
                field: 'endtime'
            },{
                title: '创建时间',
                align: "center",
                halign: "center",
                field: 'createtime'
            },{
                title: '功能',
                align: "center",
                halign: "center",
                width:'100px',
                formatter:function (value,row,index){
                    let a = '<a href="javascript:void(0);" onclick="removeInfo(\''+row.id+'\')">删除 </a>'
                    let b = '<a href="javascript:void(0);" onclick="startExam(\''+row.id+'\',\''+row.examname+'\',\''+row.examtime+'\',\''+row.starttime+'\',\''+row.endtime+'\')">开始考试</a>'
                    return a+b
                }
            }
        ]
    })
}
//删除按钮
function removeInfo(id){
    let jsonData={};
    let acc = localStorage.getItem("acc");
    jsonData.acc = acc;
    jsonData.id=id;
    console.log(id)
    $.ajax({
        url:"http://localhost:8080/exam_TBDB_SSM2/deleteTest",
        type:"post",
        contentType:"application/json",
        dataType:"json",
        data:JSON.stringify(jsonData),
        success:function (result){
            if (result){
                alert("操作成功!")
                reLoad()
            }else {
                alert("操作失败!")
            }

        }
    })
}
// startExam
function startExam(id,examname,examtime,starttime,endtime){
    layer.open({
        type:2,
        title:"开始考试",
        maxmin:false,
        shadeClose:false,
        area:['80%','80%'],
        content:'StartExam.html',
        success:function (layero,index){
            localStorage.setItem("id",id);
            let childBody = layer.getChildFrame('body',index);
            $(childBody).find('.examName').text(examname);
            $(childBody).find('.examTime').text(examtime);
            $(childBody).find('.examStart').text(starttime);
            $(childBody).find('.examEnd').text(endtime);
            $(childBody).find('.examId').text(id);

        }
    })
}
