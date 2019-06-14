let year = document.querySelector('.selectBox1');
let semester = document.querySelector('.selectBox2');
let outPut = document.querySelector('.bubbly-button');
$body = $('#body');
let beforeYear;
let beforeSemester;
let jsonData;
client = JSON.parse(window.localStorage.getItem('client'));
year.addEventListener('change', queryGrade);
semester.addEventListener('change', queryGrade);

function judge() {
    return !isNaN(year.value) && !isNaN(semester.value) && (beforeYear !== year.value
        || beforeSemester !== semester.value);
}

function queryGrade() {
    if (judge()) {
        jsonData = undefined;
        let url = "http://203.195.193.218/es/selScore?stuNum="
            + client.stuNum + "&year=" + year.value + "&semester=" + semester.value;
        fetch(url, {
            // mode:'GET',
            credentials: 'include',
        }).then(function (response) {
            return response.json();
        }, function () {
            alert("网络错误");
        }).then(function (json) {
            //将成绩数据装载到表格中
            beforeYear = year.value;
            beforeSemester = semester.value;
            jsonData = json;
            loadJSON2Table(json);
        }).catch(function (e) {
            console.log(e);
            alert("查询失败");
        });
    }
}

loadJSON2Table = function (json) {
    $body.children('tr').remove();
    if (json == '') {//无数据
        alert('该学年该学期尚无数据');
        return;
    }
    let template = [`<tr>
            <td class="courseName"></td>
            <td class="teachName"></td>
            <td class="credit"></td>
            <td class="score"></td>
            <td class="GPA"></td>
            <td class="elective"></td>
            </tr>`];
    for (var i = 0; i < json.length; i++) {
        $body.append(template);
    }
    const classes = ['courseName', 'teachName', 'credit', 'score', 'GPA', 'elective'];
    for (var i = 0; i < classes.length; i++) {
        let items = document.querySelectorAll('.' + classes[i]);
        items.forEach(function (item, index) {
            if (classes[i] == 'GPA') {
                if (!isNaN(json[index]['score']) && json[index]['score'] >= 60) {
                    var score = Number.parseInt(json[index]['score']) - 50;
                    item.innerHTML = (score / 10.0).toFixed(1);
                } else {
                    item.innerHTML = '\\';
                }
            } else if (classes[i] == 'elective') {
                item.innerHTML = json[index]['elective'] == 0 ? '必修' : '选修';
            } else if (classes[i] == 'score') {
                item.innerHTML = isNaN(json[index][classes[i]]) ? "\\" : json[index][classes[i]];
            } else if (classes[i] == 'teachName') {
                item.value = json[index]['teachNum'];//记录teachNum
                item.innerHTML = json[index][classes[i]];
            } else {
                item.innerHTML = json[index][classes[i]];
            }
        });
    }
};

outPut.addEventListener('click', function () {
    if (jsonData == undefined) {
        alert('暂无数据可导出');
    } else {
        // json2Excel(jsonData);
        doit('xlsx', client.stuName + year.value + '学年第' + semester.value + '学期成绩.xlsx');
    }
});

function doit(type, fn, dl) {
    var elt = document.getElementById('gradeTable');
    var wb = XLSX.utils.table_to_book(elt, {sheet: "Sheet JS"});
    return dl ?
        XLSX.write(wb, {bookType: type, bookSST: true, type: 'base64'}) :
        XLSX.writeFile(wb, fn || ('test.' + (type || 'xlsx')));
}

$(".survey").click(function () {
    $(".teachName").addClass("canSurvey").click(function () {
            window.localStorage.setItem("teachNumInSurvey", this.value);
            window.location.href = "survey.html";
    });
});

// var wopts = {
//     bookType: 'xlsb',
//     bookSST: false,
//     type: 'binary'
// };
// var workBook = {
//     SheetNames: ['Sheet1'],
//     Sheets: {},
//     Props: {}
// };
//
// function json2Excel(dataSource) {
//
//     //1、XLSX.utils.json_to_sheet(data) 接收一个对象数组并返回一个基于对象关键字自动生成的“标题”的工作表，默认的列顺序由使用Object.keys的字段的第一次出现确定
//     //2、将数据放入对象workBook的Sheets中等待输出
//     workBook.Sheets['Sheet1'] = XLSX.utils.json_to_sheet(dataSource);
//
//     //3、XLSX.write() 开始编写Excel表格
//     //4、changeData() 将数据处理成需要输出的格式
//     saveAs(new Blob([changeData(XLSX.write(workBook, wopts))], {type: 'application/octet-stream;charset=utf-8'}),
//         client.stuName+year.value+'学年第'+semester.value+'学期成绩');
// }
//
// function changeData(s) {
//
//     //如果存在ArrayBuffer对象(es6) 最好采用该对象
//     if (typeof ArrayBuffer !== 'undefined') {
//
//         //1、创建一个字节长度为s.length的内存区域
//         var buf = new ArrayBuffer(s.length);
//
//         //2、创建一个指向buf的Unit8视图，开始于字节0，直到缓冲区的末尾
//         var view = new Uint8Array(buf);
//
//         //3、返回指定位置的字符的Unicode编码
//         for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
//         return buf;
//
//     } else {
//         var buf = new Array(s.length);
//         for (var i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xFF;
//         return buf;
//     }
// }
//
// function saveAs(obj, fileName) {//当然可以自定义简单的下载文件实现方式
//
//     var tmpa = document.createElement("a");
//
//     tmpa.download = fileName || "下载";
//     tmpa.href = URL.createObjectURL(obj); //绑定a标签
//     tmpa.click(); //模拟点击实现下载
//
//     setTimeout(function () { //延时释放
//         URL.revokeObjectURL(obj); //用URL.revokeObjectURL()来释放这个object URL
//     }, 100);
//
// }