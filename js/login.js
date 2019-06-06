loginNumInput.addEventListener('keyup', () => {loginNumInput.value=loginNumInput.value.replace(/[^\d]/g,'');});
loginNumInput.addEventListener('blur', ()=>{loginNumInput.value=loginNumInput.value.replace(/[^\d]/g,'');
    loginNumInput.placeholder = '学号/工号';
    check(false);});
loginNumInput.addEventListener('focus', () => loginNumInput.placeholder = "");
pwdInput.addEventListener('focus', () => {pwdInput.placeholder = "";});
pwdInput.addEventListener('blur', ()=>{pwdInput.placeholder = '密码';
    check(false);});

//登录
loginButton.addEventListener("click", function () {
    if(check(false)){
        verify();
    }else{//输入不合法
        check(true);
    }
});

function check(judge) {
    let re = true;
    warningsTexts[0].style.display=warningsTexts[1].style.display="none";
    if (loginNumInput.value.length < 6){
        re = false;
        warningsTexts[0].style.display=loginNumInput.value.length>0||judge?"inline":"none";
    }
    if(pwdInput.value.length < 6){
        re = false;
        warningsTexts[1].innerHTML = '密码不少于6位';
        warningsTexts[1].style.display=pwdInput.value.length>0||judge?"inline":"none";
    }
    return re;
}

let verifyMsg;

function verify() {
    $("#verify").slideVerify({
        type: 2,		//类型
        vOffset: 5,	//误差量，根据需求自行调整
        vSpace: 5,	//间隔
        imgName: ['1.jpg', '2.jpg'],
        imgSize: {
            width: '400px',
            height: '200px',
        },
        blockSize: {
            width: '40px',
            height: '40px',
        },
        barSize: {
            width: '400px',
            height: '40px',
        },
        ready: function () {
            setStyleAttribute(verifyBox, 'position', 'fixed');
        },
        success: function () {
            verifyMsg = document.querySelector('.verify-msg');
            verifyMsg.innerHTML='验证成功';
            submit();
        },
        error: function () {
            verifyMsg = document.querySelector('.verify-msg');
            verifyMsg.innerHTML='验证失败';
        }
    });
}

function submit() {
        let url = "http://203.195.193.218/es/login"
            .concat("?num=" + loginNumInput.value)
            .concat("&pwd=" + pwdInput.value);
        fetch(url).then(function success(response) {
            // console.log(response);
            return response.json();
        },function failure() {
            alert("网络错误！");
        }).then(function (json) {
            console.log(json);
            window.localStorage.setItem('client', JSON.stringify(json));
            if(json.hasOwnProperty('teachNum')){//teacher
                window.location.href='../pages/hash.html';
            }else if(json.hasOwnProperty('stuNum')){
                window.location.href='studentMain.html';
            }else{//用户名或密码错误
                warningsTexts[1].innerHTML="用户名或密码错误！";
                setStyleAttribute(warningsTexts[1], 'display', 'inline');
            }
        }, function () {
            alert("failure to reject");
        }).catch(function(reason){
            console.log(reason);
        }).finally(function () {
            verifyBox.innerHTML="";
        });
}

document.addEventListener('keydown',
    function(e){
        let keyCode = e.keyCode || e.which || e.charCode;
        if(keyCode === 13&&check(false)){
            if(check(false)){
                verify();
            }else{//输入不合法
                check(true);
            }
        }
    });

//http://203.195.193.218/es/dataStu?stuNum=04173001&stuName=%E7%8E%8B%E7%AD%89%E9%97%B2&majorId=1&className=%E8%BD%AF%E5%B7%A51701&idCard=342221199910192010&nation=%E6%B1%89&telNum=18755897608