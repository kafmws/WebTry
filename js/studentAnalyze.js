let query = document.querySelector(".query");
let stuNum = document.querySelector(".stuNum");
const year = 2019;
const semester = 2;
const startDate = "2019-03-03";
const endDate = "2019-07-10";
let lastQuery;
let student;
let studentGrade;
let studentAttendance;
// let gradeData = [0,0,0,0,0];//[0,60),[60,70),[70,80),[80,90),[90,100],
let gradeData = {
    courses: [],
    scores: [],
};//每门课及分数
let attendanceData = [0, 0, 0];//缺勤，正常，迟到

let gradeRadar = document.querySelector(".gradeRadar");
let attendancePie = document.querySelector(".attendancePie");
let gradeChart;
let attendanceChart;

query.addEventListener('click', function () {
    if (stuNum.value.length == 8) {
        if (lastQuery == stuNum.value) return;
        if (gradeChart != undefined) {
            gradeChart.destroy();
            attendanceChart.destroy();
            gradeData.scores = [];
            gradeData.courses = [];
            attendanceData = [0, 0, 0];
        }
        lastQuery = stuNum.value;
        let formData = new FormData();
        formData.append("num", stuNum.value);
        formData.append("pwd", "888888");
        fetch("http://203.195.193.218/es/login", {
            method: "POST",
            body: formData,
            credentials: "include",
        }).then(function (response) {
            return response.json();
        }, function () {
            alert("网络错误！");
        }).then(function (json) {
            console.log(json);
            if (json['errCode'] != 0) {
                alert("学号不存在！");
                return;
            }
            student = json;
            loadInfo().then(function () {
                // console.log(gradeData);
                // console.log(attendanceData);

                gradeChart = new Chart(gradeRadar, {
                    type: 'radar',
                    data: {
                        // label: student['stuName'],
                        labels: gradeData.courses,
                        datasets: [{
                            data: gradeData.scores,
                            color: '#fff',
                            fill: true,
                            backgroundColor: "rgba(00, 153, 255, 0.2)",
                            borderColor: "rgb(00, 153, 255)",
                            pointBackgroundColor: "rgb(255, 255, 255)",
                            pointBorderColor: "#333",
                            pointHoverBackgroundColor: "#fff",
                            pointHoverBorderColor: "rgb(00, 153, 255)",
                        }],
                    },
                    options: {
                        legend: {
                            display: false,
                            position: 'left',
                        },
                        title: {
                            display: true,
                            text: student['stuName'] + "2018~2019学年第二学期成绩一览",
                            fontColor: '#295',
                            fontSize: 24
                        },
                        scale: {
                            ticks: {
                                //最小刻度 最大刻度 刻度的步长(长度)
                                suggestedMin: 60,
                                suggestedMax: 100,
                                stepSize: 10
                            }
                        },
                        tooltips: {
                            // Disable the on-canvas tooltip
                            enabled: false,

                            custom: function (tooltipModel) {
                                // Tooltip Element
                                var tooltipEl = document.getElementById('chartjs-tooltip');

                                // Create element on first render
                                if (!tooltipEl) {
                                    tooltipEl = document.createElement('div');
                                    tooltipEl.id = 'chartjs-tooltip';
                                    tooltipEl.innerHTML = '<table></table>';
                                    document.body.appendChild(tooltipEl);
                                }

                                // Hide if no tooltip
                                if (tooltipModel.opacity === 0) {
                                    tooltipEl.style.opacity = 0;
                                    return;
                                }

                                // Set caret Position
                                tooltipEl.classList.remove('above', 'below', 'no-transform');
                                if (tooltipModel.yAlign) {
                                    tooltipEl.classList.add(tooltipModel.yAlign);
                                } else {
                                    tooltipEl.classList.add('no-transform');
                                }

                                function getBody(bodyItem) {
                                    return bodyItem.lines;
                                }


                                let score;
                                // Set Text
                                if (tooltipModel.body) {
                                    var titleLines = tooltipModel.title || [];
                                    var bodyLines = tooltipModel.body.map(getBody);

                                    var innerHtml = '<thead>';

                                    titleLines.forEach(function (title, index) {
                                        score = gradeData['scores'][gradeData['courses'].indexOf(title)];
                                        // if(score<60)innerHtml+='<font color="red">';
                                        innerHtml += '<tr><th>' + title +":" + score + '</th></tr>';
                                        // if(score<60)innerHtml+='</font>';
                                    });
                                    innerHtml += '</thead><tbody>';
                                    // console.log(innerHtml);

                                    bodyLines.forEach(function (body, i) {
                                        var colors = tooltipModel.labelColors[i];
                                        var style = 'background:#333';
                                        style += '; border-color:#333';
                                        style += '; border-width: 2px';
                                        var span = '<span style="' + style + '"></span>';
                                        innerHtml += '<tr><td>' + span + body + '</td></tr>';
                                    });
                                    innerHtml += '</tbody>';
                                    // console.log(innerHtml);

                                    var tableRoot = tooltipEl.querySelector('table');
                                    tableRoot.innerHTML = innerHtml;
                                    // alert(innerHtml);
                                }

                                // `this` will be the overall tooltip
                                var position = this._chart.canvas.getBoundingClientRect();

                                // Display, position, and set styles for font
                                tooltipEl.style.opacity = 1;
                                tooltipEl.style.position = 'absolute';
                                tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
                                tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
                                tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
                                tooltipEl.style.fontSize = '16px';
                                tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
                                if(score<60)tooltipEl.style.color="red";
                                else tooltipEl.style.color="black";
                                tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
                                tooltipEl.style.pointerEvents = 'none';
                            }
                        }
                    },
                });

                attendanceChart = new Chart(attendancePie, {
                    type: "pie",
                    data: {
                        labels: ['缺勤', '正常', '迟到'],
                        datasets: [{
                            // label: student['stuName']+'2018~2019学年第二学期成绩',
                            data: attendanceData,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.6)',
                                'rgba(54, 162, 235, 0.6)',
                                'rgba(255, 206, 86, 0.6)',
                                'rgba(75, 192, 192, 0.6)',
                                'rgba(153, 102, 255, 0.6)',
                                'rgba(255, 159, 64, 0.6)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        title: {
                            display: true,
                            text: student['stuName'] + "2018~2019学年第二学期考勤一览",
                            fontColor: '#F60',
                            fontSize: 24,
                        },
                    },
                });
            })
        }).catch((e) => {
            alert("查询出错！");
            console.log(e);
        });
    } else {
        alert("学号不合法，请重新输入！");
        stuNum.value = "";
    }
});

function getGrade() {
    let url = "http://203.195.193.218/es/selScore?stuNum="
        + student['stuNum'] + "&year=" + year + "&semester=" + semester;
    return fetch(url, {
        // mode:'GET',
        credentials: 'include',
    }).then(function (response) {
        return response.json();
    }, function () {
        alert("网络错误");
    }).then(function (json) {
        if (json.hasOwnProperty('errCode')) {
            alert(json['errMsg']);
            return;
        }
        studentGrade = json;
        json.forEach(function (info) {
            // if(info['score']<60){
            //     gradeData[0]++;
            // }else{
            //     gradeData[Math.floor((info['score']-50)/10)]++;
            // }
            gradeData.courses.push(info['courseName']);
            gradeData.scores.push(info['score']);
        })
    }).catch(function (e) {
        console.log(e);
        alert("查询失败");
    });
}

function getAttendance() {
    let url = "http://203.195.193.218/es/getCheckInTableByTime?" +
        "year=2019&semester=2&startDate=" + startDate + "&endDate=" + endDate;
    return fetch(url, {
        method: 'GET',
        credentials: "include",
    }).then(function (response) {
        return response.json();
    }).then(function (json) {
        if (json.hasOwnProperty("errCode")) {
            if (json.errCode == 1) {
                alert("信息已经过期，请重新查询！");
            }
            return;
        }
        studentAttendance = json;
        json.forEach(function (info) {
            attendanceData[info['state'] + 1]++;
        })
    }).catch(function (e) {
        alert("网络错误！");
        console.log(e);
    });
}

async function loadInfo() {
    let grade = getGrade();
    let attendance = getAttendance();
    await grade;
    await attendance;
}