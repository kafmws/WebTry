let client = JSON.parse(window.localStorage.getItem('client'));
let course = document.querySelector(".selectNewCourse");
let tbody = document.querySelector("#tbody");
let queryResult;
let optionalCourses;

function judgeRow(startTime) {//row
    if(startTime.startsWith("08"))return 1;
    if(startTime.startsWith("10"))return 2;
    if(startTime.startsWith("14"))return 3;
    if(startTime.startsWith("16"))return 4;
}

function getTd(Line, row) {
    let tr = tbody.firstElementChild;//第一行
    while(--row){
        tr = tr.nextElementSibling;
    }
    let td = tr.firstElementChild;//跳过了节数，所以取weekday无须加1
    while(Line--){
        td = td.nextElementSibling;
    }
    return td;
}

function loadCourses() {
    queryResult.forEach(function (course) {
        //course['weekday']  line
        getTd(course['weekday'],judgeRow(course['startTime'])).innerHTML="<p>"+course['courseName'] +
        "</p><span>"+"时间：1-16周<br>"+"地点："+course['address']+"<br>老师："+course['teachName']+"</span>";
    });
}

//查询课表
(function () {
    let formData = new FormData();
    formData.append("stuNum", client.stuNum);
    formData.append("year", "2019");
    formData.append("semester", "2");
    fetch("http://203.195.193.218/es/selCourse", {
        method: "POST",
        body: formData,
        credentials: "include",
    }).then(function (response) {
        return response.json();
    }, function () {
        alert("网络错误！");
    }).then(function (json) {
        if (json.hasOwnProperty('errCode')) {
            alert(json['errMsg']);
            return;
        }
        console.log(json);
        queryResult = json;
        loadCourses();
        enExpend();
    }).catch(function (e) {
        alert(e);
    })
})();

$(".outPut").click(function () {
    try {
        doit('xlsx', client.stuName + '2019学年第2学期课表.xlsx');
    } catch (e) {
        console.log(e);
        alert(e);
    }
});

(function () {
    fetch("http://203.195.193.218/es/getOptionalCourse?year=2019&semester=2", {
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
        optionalCourses = json;
        loadOptionalCourses();
    }).catch(function (e) {
        alert(e);
    });
})();

function loadOptionalCourses() {
    for (let i = 0; i < optionalCourses.length; i++) {
        course.innerHTML = course.innerHTML.concat("<option value=" + optionalCourses[i]["optionalId"]
            + '>' + optionalCourses[i]["courseName"] + "</option>");
    }
    // course.innerHTML = course.innerHTML.toString().replaceAll('"','');
}

$(".sure").click(function () {
    fetch("http://203.195.193.218/es/startToOption?stuNum=" + client.stuNum + "&optionalId=" +course.value, {
        method: 'GET',
        credentials: 'include',
    }).then(function (response) {
        return response.json();
    }, function () {
        alert("网络错误！");
    }).then(function (json) {
        if (json.hasOwnProperty("errCode")) {
            if (json['errCode'] == 1) {
                alert("您的登录信息已经过期，请重新登录！");
                window.location.href = "../pages/welcome.html";
            }
            alert(json['errMsg']);
            return;
        }
        optionalCourses = json;
        loadCourses();
    }).catch(function (e) {
        alert(e);
    });
});


function doit(type, fn, dl) {
    var elt = document.getElementById('testTable');
    var wb = XLSX.utils.table_to_sheet(elt, {sheet: "Sheet JS"});
    return dl ?
        XLSX.write(wb, {bookType: type, bookSST: true, type: 'base64'}) :
        XLSX.writeFile(wb, fn || ('test.' + (type || 'xlsx')));
}

function enExpend() {
    var open = false;
    $('.trigger').each(function (index) {
        var thisTH = $(this),
            thisItem = $(this).find('p'),
            thisItemSpan = $(this).find('span'),
            t = new TimelineMax(),
            rev = t.reversed();

        t.set(thisTH, {className: '+=active'})
            .to(thisItem, rev ? 0.3 : 0.3, {
                rotation: 0,
                transformOrigin: "50% 50%",
                paddingLeft: "96px",
                paddingRight: "96px",
                force3D: true,
                ease: Sine.easeInOut
            })
            .to(thisItemSpan, rev ? 0.3 : 0.3, {
                rotation: 0,
                transformOrigin: "50% 50%",
                paddingLeft: "12px",
                paddingRight: "12px",
                force3D: true,
                ease: Sine.easeInOut
            }, '-=0.15');

        $("tbody").find("tr").each(function () { // get all rows in tbody
            var tr = $(this);
            tr.find("td").each(function () { // get all cells in all rows
                var td = $(this);
                if (index === td.index() - 1) { // get correct cells for clicked thead
                    t.to(td.find('span'), rev ? 0.3 : 0.3, {
                        whiteSpace: 'initial',
                        width: 'inherit',
                        maxWidth: '232px',
                        height: 'auto',
                        autoAlpha: 1,
                        y: 8,
                        ease: Sine.easeInOut
                    }, '-=0.15');
                }
            });
        });

        t.reversed(true);
        this.animation = t;
    });

    $('.trigger').click(function () {
        if (this.animation.reversed()) {
            this.animation.play().timeScale(1);
        } else {
            this.animation.reverse().timeScale(1);
        }
    })
}