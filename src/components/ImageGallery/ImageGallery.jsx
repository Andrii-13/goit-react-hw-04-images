import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';


export const ImageGallery = () => {
  return (
    <ul className={css.imageGallery}>
      <ImageGalleryItem/>
    </ul>
  );
};
