import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const ModalRemove = ({ modalIsOpen, setIsOpen, deleteHandler, id, name }) => {
  const customStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      border: 'none',
      // marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'rgba(255, 255, 255, 1)',
      overflow: 'hidden',
      width: '80%',
      height: '20%',
      filter: 'drop-shadow(0 3px 3px rgba(0, 0, 0, .3))',
    },
  };

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  };

  const closeModal = (productId) => {
    deleteHandler(productId);
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel=''
    >
      <h2>Tem certeza que deseja apagar "{name}"?</h2>
      <span className='btn btn-secondary' onClick={() => setIsOpen(false)}>
        cancelar
      </span>
      <span className='btn btn-danger' onClick={() => closeModal(id)}>
        Apagar
      </span>
    </Modal>
  );
};

export default ModalRemove;
