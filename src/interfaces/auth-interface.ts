export interface IParamsLogin{
    email:string,
    password:string
}

export interface IParamsRegister{
    email:string,
    password:string,
    repeatPassword: string,
    name: string,
    gender:string
    region: number | string,
    state: number | string
}