import React, { useState } from 'react';
import css from './ImageGalleryItem.module.css';
import { Modal } from 'components/Modal/Modal';


export const ImageGalleryItem = ({unit}) => {
const [modalActive, setModalActive] = useState(false);
const [imgId, setImgId] = useState('');

const imgClick = () => {
  setModalActive(true);
  setImgId(unit.largeImageURL);
};

const closeModal = e => {
  if (e.target === e.currentTarget) {
    setModalActive(false);
  }
};

const keyCloseModal=()=>{
  setModalActive(false);
}

  return (
    <>
      <img
        id={unit.id}
        src={unit.webformatURL}
        alt={unit.tags}
        className={css.imageGalleryItemImage}
        onClick={imgClick}
      />
      {modalActive && (
        <Modal
          img={imgId}
          alt={unit.tags}
          overlayClick={closeModal}
          keyClose={keyCloseModal}
        />
      )}
    </>
  );
}

