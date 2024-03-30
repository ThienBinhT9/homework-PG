import React, { memo, useState, ChangeEvent, useRef, useEffect } from "react";
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from "react-redux";
import ReactCrop, { makeAspectCrop, type Crop, centerCrop, convertToPixelCrop } from 'react-image-crop'

import 'react-image-crop/dist/ReactCrop.css'

import Modal from '../../../components/Modal/index.tsx'

import { RootState } from "../../../redux/store.ts";
import setCanvasPreview from "../../../utils/setCanvas.ts";
import { base64StringToFile } from '../../../utils/method.tsx'
import { getProfileUser, updateAvatarUser } from "../../../services/user-service.ts";

function Avatar({initAvatar}) {

    const fileInputRef = useRef<HTMLInputElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const previewCanvasRef = useRef<HTMLCanvasElement>(null);
    const token = useSelector((state:RootState) => state.auth.token)

    const dispatch = useDispatch()

    const [showModalUpload, setShowModalUpload] = useState(false)
    const [avatarDemo, setAvatarDemo] = useState("")
    const [error, setError] = useState("")
    const [crop, setCrop] = useState<Crop>({unit: '%', width: 50, height: 50, x: 25, y: 25})

    //Hàm xử lý khi change ảnh
    const onChooseAvatar = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(!file) return
        
        const fileSizeInBytes: number = file.size;
        // Chuyển đổi kích thước từ byte sang kilobyte
        const fileSizeInKB: number = fileSizeInBytes / 1024;
        if(fileSizeInKB > 50) {
            setError("Ảnh có dung lương quá lớn (nên nhỏ hơn 50KB)")
            setAvatarDemo("")
            if(fileInputRef.current){
                fileInputRef.current.value = ""
            }
            return
        }

        const reader = new FileReader();
        reader.onload = () => {

            setAvatarDemo(reader.result as any)
        }
        reader.readAsDataURL(file)
        
    }

    //Hàm ẩn modal update ảnh
    const handleHide = () => {
        setAvatarDemo("")
        setShowModalUpload(false)
    }

    //Hàm xử lý khi chọn ảnh
    const handleLoad = (e: React.ChangeEvent<HTMLImageElement>) => {
        const {width, height, naturalHeight, naturalWidth} = e.currentTarget
        if(naturalWidth < 100 && naturalHeight < 100){
            setError("Hình ảnh phải có kích thước nhỏ nhất là 100x100")
            setAvatarDemo("")
            return
        }
        
        const _crop = makeAspectCrop({unit:"%", width:80}, 1, width, height )
        const centerdCrop = centerCrop(_crop, width, height)
        setCrop(centerdCrop)
    }

    //Hàm update ảnh
    const handleSubmit = async() => {

        setCanvasPreview(
            imgRef.current,
            previewCanvasRef.current,
            convertToPixelCrop(
                crop,
                Number(imgRef.current?.width),
                Number(imgRef.current?.height)
            )
        )

        const dataUrl =  previewCanvasRef.current?.toDataURL()
        if(!dataUrl) return
        const _file = base64StringToFile(dataUrl, "image.jpg", "image/jpeg")
        
        const avatarForm = new FormData()
        if(_file){
            avatarForm.append("file", _file, _file?.name)
        }
        handleHide()
        await updateAvatarUser(dispatch, token, avatarForm)
        await getProfileUser(dispatch, token)
        setAvatarDemo(dataUrl)
    }

    useEffect(() => {
        
        return () => setError("")
    },[])

    return ( 
        <div className='profile-image'>
            <Modal title='Upload Avatar' textBtn2={avatarDemo && "Cập nhật"} show={showModalUpload} onHide={handleHide} onSubmit={handleSubmit}>
                <input type="file" ref={fileInputRef} placeholder="Chọn ảnh" accept="image/*" onChange={onChooseAvatar}/>
                {avatarDemo && (
                    <div className="profile-image-demoBox">
                        <ReactCrop 
                            circularCrop
                            crop={crop} 
                            keepSelection
                            aspect={1}
                            onChange={(pixalCrop, percentCrop) => setCrop(percentCrop)}
                        >
                            <img className="profile-image-demo" ref={imgRef} src={avatarDemo} alt="avatar" onLoad={handleLoad}/>
                        </ReactCrop>
                    </div>
                )}
                {error && <span style={{color:"red", "display":"block", "marginTop":"24px"}}>{error}</span>}
                <canvas
                    ref={previewCanvasRef}
                    className="mt-4"
                    style={{
                        display: "none",
                        border: "1px solid black",
                        objectFit: "contain",
                        width: 150,
                        height: 150,
                    }}
                />
            </Modal>

            <img src={avatarDemo || 'https://i.pinimg.com/236x/0e/32/18/0e3218732bbbe26aec6458893ed862ac.jpg' || initAvatar} alt='avatar'/>
            <FontAwesomeIcon className='profile-image__edit' icon={faPen} onClick={() => setShowModalUpload(true)}/>
        </div>
        
     );
}

export default memo(Avatar);