import useStore from "../store/modalStore";
import styled from "styled-components";

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: black;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 300px;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 10px;
  cursor: pointer;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;

  &:hover {
    background-color: #0056b3;
  }

  &:focus {
    outline: none;
  }
`;

const Modal = () => {
  const { isOpen, clearCart, closeModal } = useStore();

  const handleConfirm = () => {
    clearCart();
    closeModal();
  };

  const handleCancel = () => {
    closeModal();
  };

  if (!isOpen) return null;

  return (
    <ModalContainer>
      <ModalContent>
        <h2>장바구니를 비우시겠습니까?</h2>
        <Button onClick={handleConfirm}>네</Button>
        <Button onClick={handleCancel}>아니오</Button>
      </ModalContent>
    </ModalContainer>
  );
};

export default Modal;
