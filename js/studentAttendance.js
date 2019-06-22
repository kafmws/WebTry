let startDate = document.querySelector('.startDate');
let endDate = document.querySelector('.endDate');
let find = document.querySelector('.find');
let checks = document.querySelectorAll('.check');
let set = new Set();
$body = $('.body');
let body = document.querySelector(".body");

function judge() {
    if (startDate.value > '2019-3-04') startDate.value = "2019-03-04";//学期开始时间
    if (endDate.value > '2019-7-10') endDate.value = "2019-07-10";//学期结束时间
    return endDate.value && startDate.value && endDate.value >= startDate.value;
}

find.addEventListener('click', function () {
    $body.children('tr').remove();
    if (!judge()) {
        alert("请指定正确的起止日期！");
        return;
    }
    let url = "http://203.195.193.218/es/getCheckInTableByTime?" +
        "year=2019&semester=2&startDate=" + startDate.value + "&endDate=" + endDate.value;
    fetch(url, {
        method: 'GET',
        credentials: "include",
    }).then(function (response) {
        return response.json();
    }).then(function (json) {
        console.log(json);
        if (json.hasOwnProperty("errCode") && json.errCode == 1) {
            alert("您的登录信息已经过期，请重新登录！");
            window.location.href = "../pages/welcome.html";
            return;
        }
        loadJSON2Table(json);
    }).catch(function (e) {
        alert("网络错误！");
        console.log(e);
    });
});

loadJSON2Table = function (json) {
    let template = [`<tr onmouseover="this.style.backgroundColor='#ffff66';" onmouseout="this.style.backgroundColor='#d4e3e5';">
                               <td class="dateTime"></td>
                               <td class="courseName"></td>
                               <td class="teachName"></td>
                               <td class="address"></td>
                               <td class="state"></td>
                           </tr>`];
    set.clear();
    checks.forEach(function (check) {//筛选集
        if (check.checked) {
            set.add(check.value);
        }
    });
    let classes = ["dateTime", "courseName", "teachName", "address", "state"];
    for (let i = 0; i < json.length; i++) {
        if (set.has(String(json[i].state))) {
            $body.append(template);
            tds = body.lastElementChild.children;
            for (var index = 0; index < tds.length; index++) {
                if (index === 0) {
                    tds[index].innerHTML = json[i][classes[index]].split(" ")[0];
                } else if (index === 4) {
                    if (json[i][classes[index]] == 0) {//正常
                        tds[index].innerHTML = "<font color='green'>正常</font>";
                    } else if (json[i][classes[index]] == 1) {
                        tds[index].innerHTML = "<font color='orange'>迟到</font>";
                    } else {//缺勤
                        tds[index].innerHTML = "<font color='red'>缺勤</font>";
                    }
                } else {
                    tds[index].innerHTML = json[i][classes[index]];
                }
            }
        }
    }
};