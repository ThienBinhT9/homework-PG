export interface IRoute{
    path:string,
    element:() => React.JSX.Element,
    layout:({ children }: {
        children: any;
    }) => React.JSX.Element
}

export interface IGenderParams{
    value:string,
    label:string
}

export interface ILocationParams{
    name:string,
    id:number
}

export interface ISearchParams{
    invoice?:string | number,
    client?:string | number,
    status?:string | number,
    page?:string | number
}