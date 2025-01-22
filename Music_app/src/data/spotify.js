async function getToken() {
    const url = "https://mywebapp-775f4.ue.r.appspot.com/spotify/token"
    const options = {
        method: "GET"
    }

    const response = await fetch(url, options)

    const body = await response.json()

    console.log("token: ", body.access_token)

    return body.access_token
}

async function search(keyword, token, isNextUrl = false) {

    let url;
    if (isNextUrl === true) {
        url = keyword
    } else {
        url = "https://api.spotify.com/v1/search"
        const params = new URLSearchParams({ q: keyword, type: "track", limit: 10 })
        url = `${url}?${params}`
    }

    const options = {
        method: "GET",
        headers: { "Authorization": "Bearer " + token }
    };

    const response = await fetch(url, options)
    const data = await response.json()

    const tracksInfo = []

    for (let track of data.tracks.items) {
        const albumName = track.album.name
        const artistName = track.artists.map(artist => artist.name).join(", ")
        const songName = track.name
        const durationMs = track.duration_ms
        const previewUrl = track.preview_url
        const externalUrl = track.external_urls.spotify
        const nextUrl = track.next

        tracksInfo.push({
            album: albumName,
            artist: artistName,
            song: songName,
            duration: durationMs,
            url: previewUrl,
            outUrl: externalUrl,
            more: nextUrl
        })
    }

    console.log("Tracks Info:", tracksInfo)
    return { tracks: tracksInfo, next: data.tracks.next }

}

// For first search
export async function performSearch(keyword) {
    const token = await getToken()
    const resultData = await search(keyword, token)
    return resultData
}

// For searching more results
export async function performSearchMore(nextUrl) {
    const token = await getToken()
    const resultData = await search(nextUrl, token, true)
    return resultData
}