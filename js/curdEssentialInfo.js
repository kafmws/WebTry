//////////////common
let teacher = document.querySelector(".teacher");
let student = document.querySelector(".student");
let reset = document.querySelector(".reset");
let addBox = document.querySelector("#xztb");//新增信息框

const url = "http://203.195.193.218/es/";

reset.addEventListener("click", function () {
    // queryType.selectedIndex = 0;
    queryContent.value = "请输入";
});

teacher.addEventListener('change', () => {
    queryContent.value = "";
    arrowPre.style.opacity = arrowNext.style.opacity = 1.0;
    student.checked = false;
    teacher2Stu();
});

student.addEventListener('change', () => {
    queryContent.value = "";
    arrowPre.style.opacity = arrowNext.style.opacity = 1.0;
    teacher.checked = false;
    stu2Teacher();
});

function teacher2Stu() {
    tbody.innerHTML = "";
    queryType.innerHTML = "";
    const types = ["姓名", "工号", "学院"];
    const values = ["teachName", "teachNum", "collegeName"];
    types.forEach(function (type, index) {
        queryType.innerHTML += "<option value='" + values[index] + "'>" + type + "</option>";
    });
    tableHeader.innerHTML = [`
            <th>姓名</th>
            <th>工号</th>
            <th>手机号</th>
            <th>性别</th>
            <th>出生年月</th>
            <th>所属学院</th>
            <th>操作</th>`];
    addBox.innerHTML = [`<tbody>
                            <tr>
                                <td class="tb_bg"><label><font
                                        style="font-size: 16px; color: red;">*</font>姓名</label>
                                </td>
                                <td><input class="stuName teachName" type="text" placeholder="请输入姓名"/></td>
                                <td class="tb_bg"><label><font
                                        style="font-size: 16px; color: red;">*</font>工号</label>
                                </td>
                                <td><input class="stuNum teachNum" type="number" placeholder="请输入学号"/></td>
                            </tr>
                            <tr>
                                <td class="tb_bg"><label>手机号</label>
                                </td>
                                <td><input class="telNum" type="number" placeholder="请输入手机号"/></td>
                                <td class="tb_bg"><label>身份证号</label></td>
                                <td><input class="idNum" type="number" placeholder="请输入证件号"/></td>
                            </tr>
                            <tr>
                            <td class="tb_bg"><label>学院</label></td>
                                <td>
                                    <select class="form-control select_down selectCollege" style="font-size: 13px; color: #666;">
                                        <option>计算机学院</option>
                                        <option>通信工程学院</option>
                                        <option>电子工程学院</option>
                                        <option>外国语学院</option>
                                        <option>理学院</option>
                                    </select>
                                </td>
                                <td class="tb_bg"><label></label></td>
                                <td></td>
                            </tr>
                            </tbody>`];
}

function stu2Teacher() {
    tbody.innerHTML = "";
    queryType.innerHTML = [`
                        <option value="stuName">姓名</option>
                        <option value="stuNum">学号</option>
                        <option value="collegeName">学院</option>
                        <option value="majorName">专业</option>
                        <option value="className">行政班级</option>
    `];
    tableHeader.innerHTML = [`
            <th>姓名</th>
            <th>学号</th>
            <th>手机号</th>
            <th>性别</th>
            <th>年级</th>
            <th>学院</th>
            <th>专业班级</th>
            <th>操作</th>`];
    addBox.innerHTML = [`<tbody>
                            <tr>
                                <td class="tb_bg"><label><font
                                        style="font-size: 16px; color: red;">*</font>姓名</label>
                                </td>
                                <td><input class="stuName teachName" type="text" placeholder="请输入姓名"/></td>
                                <td class="tb_bg"><label><font
                                        style="font-size: 16px; color: red;">*</font>学号</label>
                                </td>
                                <td><input class="stuNum teachNum" type="number" placeholder="请输入学号"/></td>
                            </tr>
                            <tr>
                                <td class="tb_bg"><label>手机号</label>
                                </td>
                                <td><input class="telNum" type="number" placeholder="请输入手机号"/></td>
                                <td class="tb_bg"><label>身份证号</label></td>
                                <td><input class="idNum" type="number" placeholder="请输入证件号"/></td>
                            </tr>
                            <tr>
                                <td class="tb_bg"><label>民族</label></td>
                                <td>
                                    <input class="nation" type="text" placeholder="请输入民族"/></td>
                                <td class="tb_bg"><label>学院</label></td>
                                <td>
                                    <select class="form-control select_down selectCollege" style="font-size: 13px; color: #666;">
                                        <option>计算机学院</option>
                                        <option>通信工程学院</option>
                                        <option>电子工程学院</option>
                                        <option>外国语学院</option>
                                        <option>理学院</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td class="tb_bg"><label><font
                                        style="font-size: 16px; color: red;">*</font>专业</label></td>
                                <td><input class="majorName" type="text" placeholder="请输入专业名"/></td>
                                <td class="tb_bg"><label><font
                                        style="font-size: 16px; color: red;">*</font>班级</label>
                                <td><input class="className" type="text" placeholder="请输入班级名称"/></td>
                            </tr>
                            </tbody>`];
}

/////////////create
let upload = document.querySelector(".upload");
let selectFile = document.querySelector("#selectFile");

let num = document.querySelector(".stuNum");
let name = document.querySelector(".stuName");
let idNum = document.querySelector(".idNum");
let telNum = document.querySelector(".telNum");
let majorName;//Student
let className;//Student
let nation;//Student
let selectCollege;//Teacher

let sure = document.querySelector(".sure");//确定增加
let $cancel = $(".cancel");//取消

const createURL = ["dataStu", "dataTeach"];

sure.addEventListener("click", function () {
    if (check()) {
        let formData = new FormData();
        if (student.checked) {
            formData.append("stuNum", num.value);
            formData.append("stuName", name.value);
            formData.append("majorName", majorName.value);
            formData.append("className", className.value);
            formData.append("idCard", idNum.value);
            formData.append("nation", nation.value);
            formData.append("telNum", telNum.value);
        } else {
            formData.append("teachNum", num.value);
            formData.append("teachName", name.value);
            formData.append("courseName", selectCollege.value);
            formData.append("idCard", idNum.value);
            formData.append("telNum", telNum.value);
        }
        fetch(url + createURL[teacher.checked ? 1 : 0], {
            method: "POST",
            body: formData,
            credentials: "include",
        }).then(function (response) {
            return response.json();
        }, function () {
            alert("操作失败！");
        }).then(function (json) {
            alert(json['errMsg']);
            if (json['errCode'] == 0) {//清空新增框
                queryResult = json;
                name.value = num.value = idNum.value = telNum.value = "";
                if (student.checked) {
                    majorName.value = className.value = nation.value = "";
                }
            }
        }).catch(function (e) {
            alert("操作失败！");
            console.log(e);
        }).finally(() => {
            $cancel.click();
        })
    }
});

function check() {
    if (student.checked) {
        majorName = document.querySelector(".majorName");
        className = document.querySelector(".className");
        nation = document.querySelector(".nation");
        if (className.value == "" || teacher.checked) {
            alert("班级是必填项！");
            return false;
        }
    } else {
        selectCollege = document.querySelector(".selectCollege");
    }
    if (num.value == "") {
        alert("学号/工号是必填项！");
        return false;
    }
    if (name.value == "") {
        alert("姓名是必填项！");
        return false;
    }
    return true;
}

upload.addEventListener("click", function () {
    let forData = new FormData();
    forData.append("myFile", selectFile.files[0]);
    $.ajax({
        type: "POST",
        url: student.checked ? "http://203.195.193.218/es/excelStu" : "http://203.195.193.218/es/excelTeach",
        data: forData,
        mimeType: "multipart/form-data",
        contentType: false,
        processData: false,
        xhrFields: {
            withCredentials: true
        },
        complete: function (msg) {
            console.log(msg.responseText);
            let res = JSON.parse(msg.responseText);
            switch (res['errCode']) {
                case 0:
                    alert("添加成功！");
                    break;
                case 3:
                    alert(res['errMsg']);
                    window.location.href = "welcome.html";
                    break;
                default:
                    alert(res['errMsg']);
                    break;
            }
        },
        error: function () {
            alert("网络错误！");
        }
    });
});

/////////////////////////////update
function editable() {
    $(".edit").click(function () {
        // $("body").addClass("modal-open").append("<div class=\"modal-backdrop fade show\"></div>");
        let teachNum = this.parentElement.parentElement.firstElementChild.nextElementSibling.innerHTML;
        $("#"+teachNum).fadeIn(500).change(function () {
            let formData =new FormData();
            formData.append("teachNum", teachNum);
            formData.append("collegeName", this.value);
            fetch("http://203.195.193.218/es/updateTeachCollege", {
                method:"POST",
                body: formData,
                credentials:"include",
            }).then(function (response) {
                return response.json();
            }, function () {
                alert("网络错误！");
            }).then(function (json) {
                alert(json['errMsg']);
            }).catch(function (e) {
                alert("修改失败");
                console.log(e);
            }).finally(()=>{queryTeacher();});
        });
    })
}

function del() {
    $(".del").click(function () {
        let nameElement = this.parentElement.parentElement.firstElementChild;
        if (window.confirm('确定要删除学生' + nameElement.innerHTML + '吗？')) {
            let formData = new FormData();
            formData.append("stuNum", nameElement.nextElementSibling.innerHTML);
            fetch("http://203.195.193.218/es/delStu", {
                method: "POST",
                body: formData,
                credentials: "include",
            }).then(function (response) {
                return response.json();
            }, function () {
                alert("网络错误！");
            }).then(function (json) {
                alert(json['errMsg']);
            }).catch(function (e) {
                alert(e);
            }).finally(function () {
                nameElement.parentElement.remove();
            });
        }
    })
}

/////////////////////////////////query
let queryType = document.querySelector(".queryType");//查询关键字类型
let queryContent = document.querySelector(".queryContent");//查询关键字
// let queryForm = document.querySelector(".queryForm");
let query = document.querySelector(".query");//查询Button
let arrowPre = document.querySelector(".arrowPre");
let arrowNext = document.querySelector(".arrowNext");

let tableHeader = document.querySelector(".tableHeader");
let tbody = document.querySelector(".tbody");
$tbody = $(".tbody");

let queryResult;//查询结果

const queryStudentURL = ["selStu", "selStu", "selStuByCollegeNameOrCollegeNum", "selStuByMajorName", "selStuByClassName"];

queryType.addEventListener("change", () => {
    queryContent.value = ""
});

query.addEventListener("click", function () {
    if (queryContent.value == "") {
        alert("请输入查询内容！");
        return;
    }
    // new Promise(function (resolve) {
    teacher.checked ? queryTeacher() : queryStu();
    // }).then(function () {

    // });
});

function queryStu(pn = 1) {//分页
    tbody.innerHTML = "";
    arrowPre.style.opacity = "0";
    arrowNext.style.opacity = "0";
    let formData = new FormData();
    formData.append(queryType.value, queryContent.value);
    if (queryType.selectedIndex > 1) {//有分页
        formData.append("pn", pn);
    }
    fetch(url + queryStudentURL[queryType.selectedIndex], {
        method: "POST",
        body: formData,
        credentials: "include",
    }).then(function (response) {
        return response.json();
    }, function () {
        alert("网络错误！");
    }).then(function (json) {
        console.log(json);
        if (json == "" || (json.hasOwnProperty("list") && json['list'] == "")) {
            alert("没有符合要求的信息！");
            return;
        } else if (json['errCode'] == 1) {
            alert("身份信息已过期，请重新登录！");
            window.location.href = "../pages/welcome.html";
        } else if (json['errCode']) {
            alert("查询失败！");
            return;
        }
        queryResult = json;
        arrowPre.style.opacity = (json.hasOwnProperty("hasPreviousPage") && json['hasPreviousPage']) ? "1.0" : "0";
        arrowNext.style.opacity = (json.hasOwnProperty("hasNextPage") && json['hasNextPage']) ? "1.0" : "0";
        if (queryType.selectedIndex > 1) {//有分页
            json = json['list'];
        }
        json.forEach(function (stu) {
            $tbody.append("<tr>\n" +
                "            <td>" + stu['stuName'] + "</td>\n" +
                "            <td>" + stu['stuNum'] + "</td>\n" +
                "            <td>" + stu['telNum'] + "</td>\n" +
                "            <td>" + stu['sex'] + "</td>\n" +
                "            <td>" + stu['stuNum'].substring(2, 4) + "</td>\n" +
                "            <td>" + stu['collegeName'] + "</td>\n" +
                "            <td>" + stu['className'] + "</td>\n" +
                "            <td><span class=\"del\">删除</span></td>\n" +
                "        </tr>");
        });
    }).catch(function (e) {
        alert("查询失败！");
        console.log(e);
        console.log(queryResult);
    }).finally(function () {
        del();
    });
}

arrowPre.addEventListener("click", () => {
    if (queryContent.value == "") return;
    queryStu(Number(queryResult['pageNum']) - 1);
});
arrowNext.addEventListener("click", () => {
    if (queryContent.value == "") return;
    queryStu(Number(queryResult['pageNum']) + 1);
});

const queryTeacherURL = ["selTeach", "selTeach", "selTeachByCollegeNameOrCollegeNum"];

function queryTeacher() {
    tbody.innerHTML = "";
    arrowPre.style.opacity = "0";
    arrowNext.style.opacity = "0";
    let formData = new FormData();
    formData.append(queryType.value, queryContent.value);
    fetch(url + queryTeacherURL[queryType.selectedIndex], {
        method: "POST",
        body: formData,
        credentials: "include",
    }).then(function (response) {
        return response.json();
    }, function () {
        alert("网络错误！");
    }).then(function (json) {
        if (json.hasOwnProperty('errCode')) {
            alert("查询失败！" + json['errMsg']);
            return;
        }
        queryResult = json;
        json.forEach(function (teacher) {
            $tbody.append("<tr>" +
                "            <td>" + teacher['teachName'] + "</td>\n" +
                "            <td>" + teacher['teachNum'] + "</td>\n" +
                "            <td>" + teacher['telNum'] + "</td>\n" +
                "            <td>" + teacher['sex'] + "</td>\n" +
                "            <td>" + teacher['birth'] + "</td>\n" +
                "            <td>" + teacher['collegeName'] + "</td>\n" +
                "            <td><select id='"+teacher['teachNum']+"' class=\"newCollege\">\n" +
                "        <option selected>请选择学院</option>\n" +
                "        <option>计算机学院</option>\n" +
                "        <option>通信工程学院</option>\n" +
                "        <option>电子工程学院</option>\n" +
                "        <option>外国语学院</option>\n" +
                "        <option>理学院</option>\n" +
                "    </select><span class=\"edit\">修改学院</span></td>\n" +
                "        </tr>");
        });
    }).catch(function (e) {
        alert(e);
    }).finally(function () {
        editable();
    });
}