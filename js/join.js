document.memberFrm.onsubmit = function(){

    var pwd = document.getElementById("pwd");
    var pwdCheck = document.getElementById("pwdCheck");
    var userName = document.getElementById("userName");
    var email = document.getElementById("email");
    var tel1 = document.getElementById("tel1");
    var tel2 = document.getElementById("tel2");
    var tel3 = document.getElementById("tel3");

    //2.비밀번호 확인 검사
    //숫자/문자/특수문자/ 포함 형태의 8~15자리 이내의 암호 정규식 
    //전체길이검사 /^.{8,15}$/
    //숫자하나 반드시 포함 /\d/ 
    //영문자 반드시 포함 /[a-zA-Z]/
    //특수문자 반드시 포함  /[\*!&]/
        
    var regExpArr = [/^.{8,15}$/, /\d/, /[a-zA-Z]/, /[\*!&]/];

    for(let i = 0; i < regExpArr.length; i++){
        if(!regExpTest(regExpArr[i], pwd, "비밀번호는 8~15자리 숫자/문자/특수문자를 포함해야합니다.")){
            return false;
        }
    }
    
    //비밀번호 일치 여부
    if(!isEqualPwd()){
        return false;
    }

    //3.이름검사
    //한글 2글자 이상만 허용. 
    var regExp3 = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{2,}$/;
    if(!regExpTest(regExp3,userName,"한글2글자이상 입력하세요."))
        return false;

    //5.이메일 검사
    // 4글자 이상(\w = [a-zA-Z0-9_], [\w-\.]) @가 나오고
    // 1글자 이상(주소). 글자 가 1~3번 반복됨

    if(!regExpTest(/^[\w]{4,}@[\w]+(\.[\w]+){1,3}$/, email, "이메일 형식에 어긋납니다."))
    return false;
    
    // `/^[\w]{4,}@[\w]+(\.[\w]+){1,3}$/`
    // 1. `^[\w]{4,}@` 시작하고 영문자/숫자/_4글자이상나오고 `@` 가 이어지는지
    // 2. `@[\w]+` @이후 영문자/숫자/_가 한글자 이상
    // 3. `(\.[\w]+){1,3}$` `\.` . (escaping) 이후 영문자/숫자/_가 1~3글자 나오고 끝나는지
    
    
    //6. 전화번호 검사
    // 전화번호 앞자리는 010, 두번째 자리는 3~4자리 숫자, 세번째 자리는 4자리 숫자
    if (!regExpTest(/^010$/, tel1, "번호 2자리 이상 입력"))
            return false;
    if (!regExpTest(/^[0-9]{3,4}$/, tel2, "번호 3자리 이상 입력"))
            return false;
    if (!regExpTest(/^[0-9]{4}$/, tel3, "4자리 번호 입력"))
            return false;

    return true;
}

function isEqualPwd(){
    if(pwd.value == pwdCheck.value){
        return true;
    }
    else{
        alert("비밀번호가 일치하지 않습니다.");
        pwd.select();
        return false;
    }
}

function regExpTest(regExp, el, msg){
    if(regExp.test(el.value))
        return true;
    //적합한 문자열이 아닌 경우
    alert(msg);
    el.value="";
    el.focus();
    return false;
}