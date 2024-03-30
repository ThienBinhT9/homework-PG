import {HOST} from '../utils/constants.ts'

enum SERVICE_API{
    auth,
    protected,
    public
}

const getBaseUrl = (service: SERVICE_API) => {
    if(service === SERVICE_API.auth) return `${HOST}/auth`
    if(service === SERVICE_API.protected) return `${HOST}/protected`
    if(service === SERVICE_API.public) return `${HOST}`
}

export const API_PATH = {
    //auth
    register: `${getBaseUrl(SERVICE_API.auth)}/register`,
    login: `${getBaseUrl(SERVICE_API.auth)}/login`,
    logout: `${getBaseUrl(SERVICE_API.auth)}/logout`,
    refreshToken: `${getBaseUrl(SERVICE_API.auth)}/refresh`,

    //location
    location:`${getBaseUrl(SERVICE_API.public)}/location`,

    //user
    getProfile:`${getBaseUrl(SERVICE_API.public)}/user`,

    //product
    getAllProduct:`${getBaseUrl(SERVICE_API.public)}/product`
}