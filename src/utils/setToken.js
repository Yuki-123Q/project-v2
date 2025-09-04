export function setToken(tokenKey, token) {
    localStorage.setItem(tokenKey, token);
}
export function getToken(tokenKey) {
    return localStorage.getItem(tokenKey);
}
export function removeToken(tokenKey) {
    localStorage.removeItem(tokenKey);
}