"use strict";

const userForm = new UserForm();

userForm.loginFormCallback = data => {
    ApiConnector.login(data, responce => responce.success ? location.reload() : userForm.setLoginErrorMessage("Неверный логин или пароль"))
};



userForm.registerFormCallback = data => {
    ApiConnector.register(data, responce => responce.success ? location.reload() : userForm.setLoginErrorMessage("Данные введены некорректно"))
};

