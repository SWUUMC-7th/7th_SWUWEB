import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { closeModal } from "../store/slices/modalSlice";
import { resetCart } from "../store/slices/cartSlice";

const Modal: React.FC = () => {
  const isOpen = useSelector((state: RootState) => state.modal.isOpen);
  const dispatch = useDispatch();

  if (!isOpen) return null;

  return (
    <Overlay>
      <ModalContainer>
        <CloseButton onClick={() => dispatch(closeModal())}>✖</CloseButton>
        <ModalContent>
          <ModalTitle>장바구니 비우기</ModalTitle>
          <ModalMessage>정말로 장바구니를 비우시겠습니까?</ModalMessage>
        </ModalContent>
        <ButtonGroup>
          <ModalButton
            primary
            onClick={() => {
              dispatch(resetCart());
              dispatch(closeModal());
            }}
          >
            네, 비우겠습니다
          </ModalButton>
          <ModalButton onClick={() => dispatch(closeModal())}>아니요</ModalButton>
        </ButtonGroup>
      </ModalContainer>
    </Overlay>
  );
};

export default Modal;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: #ffffff;
  width: 90%;
  max-width: 400px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25);
  position: relative;
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #707070;

  &:hover {
    color: #333;
  }
`;

const ModalContent = styled.div`
  padding: 30px 20px 20px;
`;

const ModalTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #000000;
`;

const ModalMessage = styled.p`
  font-size: 16px;
  color: #333333;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: #f9f9f9;
`;

const ModalButton = styled.button<{ primary?: boolean }>`
  flex: 1;
  padding: 10px 15px;
  font-size: 14px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  margin: 0 5px;
  cursor: pointer;
  background: ${({ primary }) => (primary ? "#ff4949" : "#e7e7e7")};
  color: ${({ primary }) => (primary ? "#fff" : "#333")};

  &:hover {
    background: ${({ primary }) => (primary ? "#f13131" : "#d6d6d6")};
  }
`;
