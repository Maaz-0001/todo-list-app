function createAccount() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (email === "" || password === "") {
    alert("Email and Password cannot be empty!");
    return;
  }

  if (!email.includes("@") || !email.includes(".")) {
    alert("Please enter a valid email!");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const emailExists = users.find(function(user) {
    return user.email === email;
  });

  if (emailExists) {
    alert("Email already registered!");
    window.location.href = "./index.html";
    return;
  }

  const newUser = {
    id: Date.now(),
    email: email,
    password: password
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  alert("Account Created Successfully! Please Login.");
  window.location.href = "index.html";
}
