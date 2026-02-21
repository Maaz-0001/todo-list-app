
if (localStorage.getItem("currentUser")) {
  window.location.href = "dashboard.html";
}

function loginUser() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if (email === "" || password === "") {
    alert("Email and Password cannot be empty!");
    return;
  }
 
  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (!users || users.length === 0) {
    alert("No account found. Please create an account first.");
    return;
  }

  const userFound = users.find(function(user) {
    return user.email === email && user.password === password;
  });
  console.log("User Found:", userFound);
  if (userFound) {
    alert("Login Successful!");
    localStorage.setItem("currentUser", JSON.stringify(userFound));
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid Email or Password!");
  }
}

document.getElementById("createBtn").addEventListener("click", function() {
  window.location.href = "./creat.html";
});
