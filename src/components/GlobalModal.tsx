import { Modal } from "antd";
import { useModal } from "../context/ModalContext";

const GlobalModal = () => {
  const { isOpen, closeModal, modalContent } = useModal();

  return (
    <>
      <Modal
        centered
        open={isOpen}
        onCancel={closeModal}
        footer={null}
        destroyOnClose
      >
        {modalContent}
      </Modal>
    </>
  );
};

export default GlobalModal;
