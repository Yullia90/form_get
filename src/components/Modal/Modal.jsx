import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import PropTypes from 'prop-types';

import { Overlay, ModalSt } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export function Modal({ onGiveImg, onClose }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalSt>
        <img src={onGiveImg.largeImageURL} alt={onGiveImg.tags} />
      </ModalSt>
    </Overlay>,
    modalRoot
  );
}

Modal.propTypes = {
  onGiveImg: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};
