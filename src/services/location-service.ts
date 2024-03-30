import axios from "axios";

import {API_PATH} from '../configs/api-config.ts'

interface PropsLocation{
    id?:number
}

export const getLocation = async(props: PropsLocation) => {

    const { id } = props
    try {
        let url = API_PATH.location
        if(id) {
            url = `${API_PATH.location}?pid=${id}`
        }
        const results = await axios.get(url)
        if(!results.data.error){
            return results.data.data
        }
        return results.data.message
    } catch (error) {
        return error.response.data.message
    }
}