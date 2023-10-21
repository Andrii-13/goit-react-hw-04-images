import { useEffect } from 'react';
import css from './Modal.module.css';


export const Modal = ({img, alt, overlayClick, keyClose}) => {

useEffect(() => {
  window.addEventListener('keydown', handleKeyDown); 
  return () =>{
    window.removeEventListener('keydown', handleKeyDown); 
  }
})

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      keyClose();
      console.log("Escape");
    }
  }

  return (
    <div className={css.overlay} onClick={overlayClick}>
      <div className={css.modal}>
        <img src={img} alt={alt} />
      </div>
    </div>
  );
}

