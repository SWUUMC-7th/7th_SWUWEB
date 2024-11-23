import styled from "styled-components";
import PropTypes from 'prop-types';
import { useDispatch } from "react-redux";
import {allClear} from  "../features/cart/cartSlice.js";
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

const Modal=({onClose})=>{
    const dispatch = useDispatch();
    return(
        <Container>
            <ModalBox>
                <div>담아두신 모든 음반을 삭제하시겠습니까?</div>
                <LButton onClick ={()=>{
                    onClose()
                    dispatch(allClear())
                }}
                    >네
                </LButton>
                <RButton onClick ={onClose}>아니요</RButton>
            </ModalBox>
        </Container>
    )
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired, // onClose가 필수로 전달되는 함수 타
};

export default Modal;