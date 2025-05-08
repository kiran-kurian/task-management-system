export function logout() {
  console.log("Token before logout:", localStorage.getItem("token"));
  localStorage.removeItem("token");
  console.log("Token after logout:", localStorage.getItem("token"));
  window.location.href = "/login";
}
