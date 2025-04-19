import { Modal } from "antd";
import { useModal } from "../context/ModalContext";

const GlobalModal = () => {
  const { isOpen, closeModal } = useModal();

  const handleOk = () => {
    closeModal();
  };

  return (
    <>
      <Modal
        title="Basic Modal"
        open={isOpen}
        onOk={handleOk}
        onCancel={closeModal}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default GlobalModal;
