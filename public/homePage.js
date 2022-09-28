const logoutButton = new LogoutButton();
const ratesBoard = new RatesBoard();
const moneyManager = new MoneyManager();
const favoritesWidget = new FavoritesWidget();

// Выход из личного кабинета
logoutButton.action = () => ApiConnector.logout(responce => {
    if(responce) {
        clearTimeout(timeoutId);
        location.reload();
    }
    else moneyManager.setMessage(responce, "Что-то пошло не так");
});

// Получение информации о пользователе
ApiConnector.current(responce => responce ? ProfileWidget.showProfile(responce.data) : moneyManager.setMessage(responce, "Не удалось загрзить данные"));


// Получение текущих курсов валюты
const requestForMarket = (ratesBoard) => ApiConnector.getStocks(responce => responce ? ratesBoard.fillTable(responce.data) : moneyManager.setMessage(responce, "Не удалось загрзить данные"));
let timeoutId = null;
requestForMarket(ratesBoard);
if(!isNaN(timeoutId)) {
    timeoutId = setInterval(() => {ratesBoard.clearTable(); requestForMarket(ratesBoard)}, 60000);
}

// Операции с деньгами
moneyManager.addMoneyCallback = (data) => ApiConnector.addMoney(data, responce => {
    if (responce.success) {
        ProfileWidget.showProfile(responce.data);
        moneyManager.setMessage(responce, "Успешно");
    }
    else moneyManage.setMessage(responce, "Что-то пошло не так");
});

moneyManager.conversionMoneyCallback = (data) => ApiConnector.convertMoney(data, responce => {
    if (responce.success) {
        ProfileWidget.showProfile(responce.data);
        moneyManage.setMessage(responce, "Успешно");
    }
    else moneyManage.setMessage(responce, "Что-то пошло не так");
});

moneyManager.sendMoneyCallback = (data) => ApiConnector.transferMoney(data, responce => {
    if (responce.success) {
        ProfileWidget.showProfile(responce.data);
        moneyManager.setMessage(responce, "Успешно");
    }
    else moneyManager.setMessage(responce, "Недостаточно денег на балансе");
});


// Работа с избранным
ApiConnector.getFavorites(responce => {
    if(responce.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(responce.data);
        moneyManager.updateUsersList(responce.data);
    }
    else moneyManager.setMessage(responce, "Не удалось загрузить данные");
})

favoritesWidget.addUserCallback = (data) => ApiConnector.addUserToFavorites(data, responce => {
    if (responce.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(responce.data);
        moneyManager.updateUsersList(responce.data);
        moneyManager.setMessage(responce, "Успешно");
    }
    else moneyManager.setMessage(responce, "Данные введены некорректно");
});

favoritesWidget.removeUserCallback = (data) => ApiConnector.removeUserFromFavorites(data, responce => {
    if (responce) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(responce.data);
        moneyManager.updateUsersList(responce.data);
        moneyManager.setMessage(responce, "Успешно");
    }
    else moneyManager.setMessage(responce, "Что-то пошло не так");
});
