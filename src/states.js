import { atom, selector } from "recoil";

export const loggedInState = atom({
    key:'isLoggedIn',
    default:false
})

export const userState = selector({
    key:'userState',
    get: ({get}) => {
        const user = get(loggedInState);
        return user;
    }
})

export const appLoadedState = atom({
    key:'appLoaded',
    default:false
})

export const isConnected = () => {
    var isOnline = navigator.onLine;
    return isOnline;
}

export const showSnackbar = (message) => {
    document.getElementById('snackbar') && document.getElementById('snackbar').remove();
    var body = document.getElementsByTagName('body')[0];

    var snackdiv = document.createElement('div');
    snackdiv.setAttribute('id', 'snackbar');
    snackdiv.innerText = message;
    body.appendChild(snackdiv);

    var x = document.getElementById('snackbar');
    x.style.zIndex = 99999;
    x.className = 'show'
    setTimeout(()=>{ x.className = x.className.replace("show", ""); }, 2500);
}

export const APIs = {
    TRANSACTION_SCANNER:'http://104.131.166.65/',
    BLOCKCHAIN:'http://157.245.4.9/api/',
    STRATALY:'https://strata.ly/api/',
    APP_SERVER:'http://64.227.4.126/'
}

export const Keys = {
    BLOCKCHAIN:'0x5883e0d5f3ed1e2ad14014884f230632f48d5871'
}