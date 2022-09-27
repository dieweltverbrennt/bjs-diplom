"use strict";

const user1 = new UserForm();

user1.loginFormCallback = data => console.log(data);


// user1.loginFormCallback = data => alert(JSON.stringify(data));


ApiConnector.login({login: "oleg@demo.ru", password: "demo"}, responce => responce.success ? location.reload() : user1.setLoginErrorMessage("Неверный пароль"));


// const user2 = new UserForm();

// user2.registerFormCallback = data => console.log(data);

// ApiConnector.register({login: "oleg@dem", password: "demo"}, responce => responce.success ? location.reload() : user2.setRegisterErrorMessage("Нет"));