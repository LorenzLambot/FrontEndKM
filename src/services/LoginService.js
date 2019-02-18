import * as fetchService from "./FetchService";

export async function login(email, password) {
    return fetchService.fetchWithHeader(
        "login",
        "POST",
        JSON.stringify({
            email: email, password: password
        }),
        {});
}
