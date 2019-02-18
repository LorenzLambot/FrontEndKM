const URL = 'http://127.0.0.1:8000/api/';



export function fetchWithHeader(api = "", method = 'GET', body = {}, error = {}) {
    let userToken = JSON.parse(localStorage.getItem('userToken')) || '';

    let headers = {
        'Authorization': "Bearer " + userToken.token,
        'Content-Type': 'application/json',
    };
    if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
        headers = {
            'Accept': 'application/json',
            'Authorization': "Bearer " + userToken.token,
            'Content-Type': 'application/json'
        }
    }

    return fetch(URL + api,
        {
            mode: 'cors',
            method: method,
            headers: headers,
            body: body
        })
        .then((response) =>
            response.json())
        .then((responseJson) => {
            return responseJson;
        })
}
