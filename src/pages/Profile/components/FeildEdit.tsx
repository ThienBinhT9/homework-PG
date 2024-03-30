import React, { memo, useState } from "react";

interface Props{
    feiled:string,
    initValue:string | number
    value:string | number
    handleChange:(e: string | React.ChangeEvent<any>) => void
}



function FeildEdit(props: Props) {

    const {initValue, value, feiled, handleChange} = props

    const [edit, setEdit] = useState(false)

    const handleChangFeiled = (e) => {
        handleChange(e)

        if(!e){
            console.log(12345);
            
            setEdit(false)
        }
    }


    return ( 
        <div className='profile-info-section'>
            <label className='profile-section-label'>{feiled}</label>
            <div className='profile-section-edit'>
                {!edit ? 
                    (<p className='profile-section-init'>{initValue || "Chưa có"}</p>) : 
                    (<input 
                        className='profile-section-input'
                        autoFocus
                        id={feiled.toLocaleLowerCase()}
                        value={value}
                        onChange={handleChangFeiled}
                    />)
                }
                <span className={`profile-section-btnEdit ${edit && "profile-section-btnEdit-active"}`} onClick={() => setEdit(prev => prev === true ? false : true)}>Chỉnh sửa</span>
            </div>
        </div>
     );
}

export default memo(FeildEdit);