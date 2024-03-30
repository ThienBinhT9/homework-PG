import React from "react";
import { Button, Modal } from 'react-bootstrap';

interface Props{
    size?:"sm" | "lg" | "xl",
    title:string,
    show:boolean,
    textBtn2?:string,
    onHide:() => void,
    onSubmit?:(values?:any) => void,
    children:any
}

function ModalContent(props: Props) {

    const {title, size, show, textBtn2, children, onHide, onSubmit} = props

    return ( 
        <Modal show={show} onHide={onHide} size={size}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {children}
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Đóng
                </Button>
                {textBtn2 && (
                    <Button variant="primary" onClick={onSubmit}>
                        {textBtn2}
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
     );
}

export default ModalContent;