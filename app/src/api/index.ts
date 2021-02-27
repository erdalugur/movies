const BASE_API_URL = 'http://localhost:5000'

interface Query {
    path?: string
    parameters: any
}
async function post({ path, parameters }: Query) {
    let endpoint = [BASE_API_URL, path].join('')
    let options: RequestInit = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "authorization": `Bearer`,
        },
        method: "POST",
        body: JSON.stringify(parameters)
    };
    return fetch(endpoint, options).then(x => x.json())
}

async function get({ path }: Query) {
    let endpoint = [BASE_API_URL, path].join('')
    return fetch(endpoint)
}

export const http = {
    get,
    post
}