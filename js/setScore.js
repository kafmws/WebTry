let course = document.querySelector(".selectBox1");
let clazz = document.querySelector(".selectBox2");
let stuList = document.querySelector(".stuList");
$stuList = $(".stuList");
let lastCourseNum;//上次成功请求的课程
let lastClass;//上次成功请求的班级
let courses;
let classes;

(function () {
    fetch("http://203.195.193.218/es/getCourseName?year=2019&semester=2", {
        method: 'GET',
        credentials: 'include',
    }).then(function (response) {
        return response.json();
    }, function () {
        alert("网络错误！");
    }).then(function (json) {
        if (json.hasOwnProperty("errCode") && json['errCode'] == 1) {
            alert("您的登录信息已经过期，请重新登录！");
            window.location.href = "../pages/welcome.html";
            return;
        }
        courses = json;
        loadCourses();
    }).catch(function (e) {
        alert(e);
    });
})();

function loadCourses() {
    for (let i = 0; i < courses.length; i++) {
        course.innerHTML = course.innerHTML.concat("<option value=" + courses[i]["courseNum"]
            + '>' + courses[i]["courseName"] + "</option>");
    }
    // course.innerHTML = course.innerHTML.toString().replaceAll('"','');
}

course.addEventListener('change', function () {
    if (lastCourseNum == course.value) return;
    while (clazz.childElementCount > 1) {
        clazz.removeChild(clazz.lastChild);
    }
    if (course.selectedIndex) {//选中课程//!isNaN(course.value)
        fetch("http://203.195.193.218/es/getClassName?year=2019&semester=2&courseNum="
            + course.value, {
            method: 'GET',
            credentials: 'include',
        }).then(function (response) {
            return response.json();
        }, function () {
            alert("网络错误！");
        }).then(function (json) {
            if (json.hasOwnProperty("errCode") && json['errCode'] == 1) {
                alert("您的登录信息已经过期，请重新登录！");
                window.location.href = "../pages/welcome.html";
                return;
            }
            classes = json;
            lastCourseNum = course.value;
            loadClasses();
        }).catch(function (e) {
            alert(e);
        })
    } else {//未选中课程
        lastCourseNum = undefined;
        lastClass = undefined;
        stuList.innerHTML = "";
    }
});

function loadClasses() {
    classes.forEach(function (classs, index) {//返回的不是标准JSON
        clazz.innerHTML = clazz.innerHTML
            .concat("<option>" + classs + "</option>");
    });
}

clazz.addEventListener('change', function () {
    if (lastClass == clazz.value) return;
    $stuList.children().remove();
    if (!isNaN(course.value) && isNaN(clazz.value)) {//选项合法
        fetch("http://203.195.193.218/es/selStuByClassName?className=" + clazz.value, {
            method: 'GET',
            credentials: "include",
        }).then(function (response) {
            return response.json();
        }, function () {
            alert("网络错误！");
        }).then(function (json) {
            if (json.hasOwnProperty("errCode") && json['errCode'] == 1) {
                alert("您的登录信息已经过期，请重新登录！");
                window.location.href = "../pages/welcome.html";
                return;
            }
            lastClass = clazz.value;
            loadStu2Table(json);
        })
    } else {//未选中班级
        lastClass = undefined;
        stuList.innerHTML = "";
    }
});

function loadStu2Table(stus) {
    let template = [`<tr>
                <td class="stuNum"></td>
                <td class="stuName"></td>
                <td class="point editable"></td>
                <td class="score editable"></td>
                <td class="finalScore"></td>
            </tr>`];
    stus.forEach(function (stu) {
        $stuList.append(template);
        let stuNum = stuList.lastElementChild.firstElementChild;
        stuNum.innerText = stu['stuNum'].substring(6);
        let stuName = stuNum.nextElementSibling;
        stuName.setAttribute("value", stu['stuNum']);
        stuName.innerText = stu['stuName'];
    });
    if (stus.length > 0) {
        $(function () {
            $('table td.editable').click(function () {
                if (!$(this).is('.input')) {
                    let td = this;
                    $(this).addClass('input').html('<input style="width:50px; " type="text" value="' + $(this).text() + '" />')
                        .find('input').focus().blur(function () {
                        if ($(this).val() > 100 || $(this).val() < 0) this.value = this.value > 100 ? 100 : 0;
                        this.value = this.value.replace(/[^\d]/g, '');
                        $(this).parent().removeClass('input').html(this.value || this.value === 0 || 60);//$(this).val() || 60
                        submitGrade(td);
                    });
                }
            }).hover(function () {
                $(this).addClass('hover');
            }, function () {
                $(this).removeClass('hover');
            });
        });
    }
}

function submitGrade(node) {
    let point, score, finalScore;
    if (node.classList.contains("point")) {//平时分
        point = node;
        score = point.nextElementSibling;
    } else {//期末成绩
        score = node;
        point = score.previousElementSibling;
    }
    finalScore = score.nextElementSibling;
    finalScore.innerText = Number(point.innerText * 0.3 + score.innerText * 0.7).toFixed();
    if (point.innerText == "" || score.innerText == "") return;
    let formData = new FormData();
    formData.append("stuNum", point.previousElementSibling.getAttribute("value"));
    formData.append("courseName", courses[course.selectedIndex-1]['courseName']);
    formData.append("score", finalScore.innerText);
    fetch("http://203.195.193.218/es/setScoreByData", {
        body : formData,
        method: "POST",
        credentials: "include",
    }).then(function (response) {
        return response.json();
    }).then(function (json) {
        console.log(json);
        if (json['errCode'] == 2) {
            alert("身份信息已过期，请重新登录！");
            window.location.href = "../pages/welcome.html";
        } else if (json['errCode'] != 0) {
            alert("网络错误！");
        }
    }).catch(function (e) {
        alert(e);
    });
}

// let editable = document.querySelectorAll('table td.editable');
// editable.forEach(function (item) {
//     item.addEventListener('click', function () {
//
//     });
//     item.addEventListener('hover', function () {
//         console.log("hover");
//     });
// });