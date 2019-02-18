import * as fetchService from "./FetchService";

export function registerUser(email, password, name) {
    return fetchService.fetchWithHeader(
        "register",
        "POST",
        JSON.stringify({
            email: email, password: password, password_confirmation: password, name: name
        }),
        {});
}