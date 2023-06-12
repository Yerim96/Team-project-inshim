const form = document.forms["login"];
function loginFunc() {
  const userIdInput = form.user_id;
  const userId = userIdInput.value;
  const userPwInput = form.user_pw;
  const userPw = userPwInput.value;

  if (userId === "") {
    alert("아이디를 입력해주세요");
    userIdInput.focus();
    return false;
  }

  if (userPw === "") {
    alert("비밀번호를 입력해주세요");
    userPwInput.focus();
    return false;
  }

  axios({
    method: "post",
    url: "/inshim/login",
    data: {
      user_id: form.user_id.value,
      user_pw: form.user_pw.value,
    },
  }).then((res) => {
    if (res.data.result) {
      const loggedin_user = {
        loggedin_userinfo_id: res.data.loggedin_userinfo_id,
        loggedin_user_name: res.data.loggedin_user_name,
      };

      alert(res.data.message);
      sessionStorage.setItem("loggedin_user", JSON.stringify(loggedin_user));
      location.href = "/inshim";
    } else {
      alert(res.data.message);
    }
  });
}