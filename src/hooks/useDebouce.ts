import {useEffect, useState} from 'react'

const useDebouce = (value:string | number, delay: number) => {
    const [debouceValue, setDebouceValue] = useState(value)

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouceValue(value)
        }, delay)

        return () => clearTimeout(timerId)
    },[value, delay])

    return debouceValue
}

export default useDebouce