window.addEventListener("load", checkIfLoggedIn());

function checkIfLoggedIn() {
  if (sessionStorage.getItem("loggedin_user")) {
    axios({
      method: "post",
      url: "/inshim/mypage",
      data: {
        userinfo_id: JSON.parse(sessionStorage.getItem("loggedin_user"))
          .userinfo_id,
      },
    }).then((res) => {
      document.getElementById("user_id_text").innerText = res.data.user_id;
      document.getElementById("user_name_text").innerText = res.data.user_name;
      document.getElementById("user_country_text").innerText =
        res.data.user_country;
    });
  } else {
    location.href = "/404";
  }
}

function logoutFunc() {
  axios({
    method: "post",
    url: "/inshim/mypage/logout",
    data: {
      loggedin_user: sessionStorage.getItem("loggedin_user"),
    },
  }).then((res) => {
    if (res.data.result) {
      sessionStorage.clear();
      alert(res.data.message);
      location.href = "/inshim";
    }
  });
}
