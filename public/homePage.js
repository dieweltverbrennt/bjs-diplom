// Выход из личного кабинета
const responseToLogout = new LogoutButton();
responseToLogout.action = () => ApiConnector.logout(responce => responce ? location.reload() : 0);

// Получение информации о пользователе
ApiConnector.current(responce => responce ? ProfileWidget.showProfile(responce.data) : 0);


// Получение текущих курсов валюты
const curRate = new RatesBoard();

function requestForMarket(a) {
    ApiConnector.getStocks(responce => responce ? a.fillTable(responce.data) : 0);
}
requestForMarket(curRate);


// Операции с деньгами
const manager = new MoneyManager();

function requestToAddMoney(data) {
    ApiConnector.addMoney(data, responce => {
        if (responce) {
            ProfileWidget.showProfile(responce.data);
            manager.setMessage(responce, "Успешно");
        }
        else manager.setMessage(responce, "Wrong");
    });
}
manager.addMoneyCallback = ({currency, amount}) => requestToAddMoney({currency, amount});


function requestToConvert(data) {
    ApiConnector.convertMoney(data, responce => {
        if (responce) {
            ProfileWidget.showProfile(responce.data);
            manager.setMessage(responce, "Успешно");
        }
        else manager.setMessage(responce, "Wrong");
    });
}
manager.conversionMoneyCallback = ({ fromCurrency, targetCurrency, fromAmount }) => requestToConvert({ fromCurrency, targetCurrency, fromAmount });


function requestToSend(data) {
    ApiConnector.transferMoney(data, responce => {
        if (responce) {
            ProfileWidget.showProfile(responce.data);
            manager.setMessage(responce, "Успешно");
        }
        else manager.setMessage(responce, "Wrong");
    });
}
manager.sendMoneyCallback = ({ to, currency, amount }) => requestToSend({ to, currency, amount });


// Работа с избранным
const adressList = new FavoritesWidget();

ApiConnector.getFavorites(responce => {
    if(responce) {
        adressList.clearTable();
        adressList.fillTable(responce.data);
        manager.updateUsersList(responce.data);
        console.log(responce.data);
    }
})


function requestToAddFavorite(data) {
    ApiConnector.addUserToFavorites(data, responce => {
        if (responce) {
            adressList.clearTable();
            adressList.fillTable(responce.data);
            manager.updateUsersList(responce.data);
            manager.setMessage(responce, "Успешно");
        }
        else manager.setMessage(responce, "Wrong");
    })
}
adressList.addUserCallback = ({ id, name }) => requestToAddFavorite({ id, name });


function requestToRemoveFavorite(data) {
    ApiConnector.removeUserFromFavorites(data, responce => {
        if (responce) {
            adressList.clearTable();
            adressList.fillTable(responce.data);
            manager.updateUsersList(responce.data);
            manager.setMessage(responce, "Успешно");
        }
        else manager.setMessage(responce, "Wrong");
    })
}
adressList.removeUserCallback = (id) => requestToRemoveFavorite(id);
