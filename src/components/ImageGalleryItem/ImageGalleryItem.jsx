import css from './ImageGalleryItem.module.css';
import { Modal } from 'components/Modal/Modal';

export const ImageGalleryItemImage = ({ unit }) => {
  return (
    <>
      <img
        src={unit.webformatURL}
        alt={unit.tags}
        className={css.imageGalleryItemImage}
      />
      <Modal img={unit.largeImageURL} />
    </>
  );
};
