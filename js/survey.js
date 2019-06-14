// fetch("http://203.195.193.218/es/getTeachOfStu", {
//     method:"POST",
//     credentials:"include",
// }).then(function (response) {
//     return response.json();
// }, function () {
//     alert("网络错误！");
// }).then(function (json) {
//     if(json.hasOwnProperty("errCode")){
//         alert("身份信息已过期，请重新登录！");
//         window.location.href = "welcome.html";
//     }
//     let teachNums = new Set();
//     let teachers = document.querySelector(".teachers");
//     json.forEach(function (item) {
//         if(!teachNums.has(item['teachNum'])){
//             teachers.innerHTML+="<option value='" + item['teachNum'] +
//                 + "'>" + item['teachName'] + "</option>";
//         }
//         teachNums.add(item['teachNum']);
//     });
// }).catch(function (e) {
//     alert("网络超时！");
//     console.log(e);
// });

let Q1 = document.querySelector(".Q1");
let Q2 = document.querySelector(".Q2");
let Q3 = document.querySelector(".Q3");
let Q4 = document.querySelector(".Q4");
let Q5 = document.querySelector(".Q5");
let Q6 = document.querySelector(".Q6");
let Q7 = document.querySelector(".Q7");
Q = [Q1, Q2, Q3, Q4, Q5, Q6];
let comment = document.querySelector(".comment");
let submit = document.querySelector(".fs-submit");
score = [14,14,14,14,14,3];//3:14,2:7,1:0   1~5 :14   6:30
let finalScore = 0;

function toScoreWeight(node) {
    if (node.parentElement === node.parentElement.parentElement.firstElementChild) {
        return 14;
    } else if (node.parentElement === node.parentElement.parentElement.lastElementChild) {
        return 0;
    }
    return 7;
}

Q.forEach(function (q) {
    // console.log(q instanceof HTMLDivElement);
    q.addEventListener("click", function (e) {
        if (e.target instanceof HTMLInputElement) {
            score[Q.indexOf(this)] = toScoreWeight(e.target);
        }else if(e.target instanceof HTMLLabelElement){
            e.target.classList.add("highlight");//span
            e.target.parentElement.parentElement.childNodes.forEach(function (span) {
                span.childNodes.forEach(function (child) {
                    if(child!==e.target){
                        child.classList.remove("highlight");
                    }
                });
            })
        }
    })
});

function calculate(){
    for(let i = 0;i<5;i++){
        finalScore+=score[i];
    }
    if(score[5]==3){
        finalScore+=30;
    }else if(score[5]==2){
        finalScore+=15;
    }
}

submit.addEventListener("click", function () {
    calculate();
    let formData = new FormData();
    formData.append("score", finalScore);
    formData.append("comment", comment.value);
    formData.append("teachNum", window.localStorage.getItem("teachNumInSurvey"));
    fetch("http://203.195.193.218/es/giveTeachScore", {
        method:"POST",
        body:formData,
        credentials:"include",
    }).then(function (response) {
        return response.json();
    }, function () {
        alert("网络错误！");
    }).then(function (json) {
        alert(json['errMsg']);
    }).catch(function () {
        alert("评分失败！");
        console.log(e);
    }).finally(()=>{window.location.href="survey.html"});
});

comment.onchange=function () {
    this.value = this.value.substring(0,50);
};

// function remove(arr, index){
//     return arr.slice(0,index).concat(arr.slice(index+1,arr.length))
// }