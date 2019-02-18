import * as fetchService from "./FetchService";

export function getFavoriteMovies() {
    return fetchService.fetchWithHeader(
        "FavoriteMovies",
        "GET",
        null,
        {});
}

export function addFavoriteMovie(movieName, score) {
    return fetchService.fetchWithHeader(
        "FavoriteMovies",
        "POST",
        JSON.stringify({
            title: movieName, score: score
        }),
        {});
}


export function updateFavoriteMovie(id, movieName, score) {
    return fetchService.fetchWithHeader(
        "FavoriteMovies/"+id,
        "PUT",
        JSON.stringify({
            title: movieName, score: score
        }),
        {});
}

export function getFavoriteMovie(id) {
    return fetchService.fetchWithHeader(
        "FavoriteMovies/"+id,
        "GET",
        null,
        {});
}

export function deleteFavoriteMovie(id) {
    return fetchService.fetchWithHeader(
        "FavoriteMovies/"+id,
        "DELETE",
        null,
        {});
}