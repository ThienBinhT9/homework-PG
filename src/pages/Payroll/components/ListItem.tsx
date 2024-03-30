import React, { memo } from "react";
import Item from "./Item.tsx";
import {useSelector} from 'react-redux'

import {RootState} from '../../../redux/store.ts'

import LoadingSpinner from '../../../components/Loading/SpinnerLoading.tsx'

interface Props{
    products:Array<any>
}

function ListItem(props: Props) {

    const { products } = props

    const {getAll, update, addToDraft, create, search} = useSelector((state: RootState) => state.payroll)

    return ( 
        <div className="payroll-listItem">
            {(getAll.isFetching || update.isFetching || addToDraft.isFetching || create.isFetching || search.isFetching) && <LoadingSpinner />}
            <Item item={{}}/>
            {products && products.map((product, index: number) => {
                return <Item key={index} item={product}/>
            })}
            {products.length === 0 && <h1>Không thấy sản phẩm nào</h1>}
        </div>
     );
}

export default memo(ListItem);