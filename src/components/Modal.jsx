import React, { useState, createContext } from 'react';
import Modal from 'react-modal';

import { ProductModal } from '../components/Products';

const ModalContext = createContext({
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {},
  modalContent: '',
  updateModalContent: () => {},
});

const ModalProvider = ({ children }) => {
  const [isModalOpen, setModalState] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const openModal = () => setModalState(true);
  const closeModal = () => setModalState(false);
  const updateModal = product => setModalContent(product);

  const contextProvider = {
    isModalOpen,
    openModal,
    closeModal,
    modalContent,
    updateModal,
  };

  return (
    <ModalContext.Provider value={contextProvider}>
      {children}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="modal-wrapper"
        overlayClassName="modal-overlay"
        contentLabel="Produkt detaljer"
      >
        {modalContent && <ProductModal product={modalContent} />}
      </Modal>
    </ModalContext.Provider>
  );
};

Modal.setAppElement('#root');

export { ModalContext, ModalProvider };
