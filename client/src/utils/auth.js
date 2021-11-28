// function to get user data from cookie that contains user data
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  if (decodedCookie.includes(cname)) {
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  else {
    return "none";
  }
}

// to get data of logged in user in JSON format
function getLoggedInUser() {
  let user = getCookie("user");
  if (user !== "none") {
    return JSON.parse(user);
  } else {
    return "none";
  }
}

// to get jwt token
function getToken() {
  let token = getCookie("jwt");
  return token;
}

//to get the type of logged in user
function userType() {
  let res = getLoggedInUser();
  if (res !== "none") {
    return res.registrationNumber.substr(0, 3);
  } else {
    return "none";
  }
}

// to delete a cookie setting expire date to some past date
function deleteCookie(name) {
  document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

// to logout user clearing cookies
function logOutUser(){
  deleteCookie("jwt");
  deleteCookie("user");
}

export { getLoggedInUser, userType, getToken, logOutUser };