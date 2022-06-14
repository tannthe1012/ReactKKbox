export default function authHeader() {
  const userStr = localStorage.getItem("user");
  let user = null;
  



  if (userStr) {
    user = JSON.parse(userStr);
    return { Authorization : 'Basic ' + btoa(user.username + ":" + user.password)}
  } else {
    return {};
  }



  // if (user && user.username) {
  //   // return { Authorization: 'Bearer ' + user.accessToken }; // for Spring Boot back-end
  //   return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
  // } else {
  //   return {};
  // }
}