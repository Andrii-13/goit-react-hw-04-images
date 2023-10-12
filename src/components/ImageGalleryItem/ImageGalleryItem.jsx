import css from './ImageGalleryItem.module.css';
import { Modal } from 'components/Modal/Modal';

export const ImageGalleryItem = () => {
  return (
    <li className={css.imageGalleryItem}>
      <img src="" alt="" className={css.imageGalleryItemImage} />
      <Modal />
    </li>
  );
};
