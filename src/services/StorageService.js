export const USER_TOKEN = "userToken";


export async function getUserToken() {
    return JSON.parse(await localStorage.getItem(USER_TOKEN));
}

export function setUserToken(userToken) {
    localStorage.setItem(USER_TOKEN, userToken);
}

export function checkToken() {
    if (localStorage.getItem(USER_TOKEN) != null) {
        return true;
    }
    localStorage.removeItem(USER_TOKEN);
    return false;
}

export function logout() {
    localStorage.removeItem(USER_TOKEN);
    return true;
}