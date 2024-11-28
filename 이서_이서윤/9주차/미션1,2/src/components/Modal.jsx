import styled from "styled-components";
import { useDispatch } from "react-redux";
import {allClear} from  "../features/cart/cartSlice.js";
import { closeModal } from "../features/modal/modalSlice.js";
const Container=styled.div`
    width:100vw;
    height:100vh;
    background:rgba(0,0,0,0.4);
    position:fixed;
    top:0;
`;
const ModalBox=styled.div`
    width:400px;
    height:150px;
    position:fixed;
    top:40%;
    left:40%;
    background:white;
    div{
        text-align:center;
        margin-top:30px;
        margin-bottom:30px;
    }
    button{
        width:80px;
        height:30px;
        line-height:10px;
        font-size:14px;
        border-radius:10px;
        margin-left:70px;
    }
`;
const LButton = styled.button`
    border:1.5px solid red;
    color:red;
`;
const RButton = styled.button`
    border:1.5px solid blue;
    color:blue;
`;

const Modal=()=>{
    const dispatch = useDispatch();
    return(
        <Container>
            <ModalBox>
                <div>담아두신 모든 음반을 삭제하시겠습니까?</div>
                <LButton onClick ={()=>{
                    dispatch(allClear())
                    dispatch(closeModal())
                }}
                    >네
                </LButton>
                <RButton onClick ={()=>dispatch(closeModal())}>아니요</RButton>
            </ModalBox>
        </Container>
    )
}

export default Modal;