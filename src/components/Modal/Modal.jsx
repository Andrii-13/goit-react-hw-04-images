import css from './Modal.module.css';
import React, { Component } from 'react';

export class Modal extends Component {

  
 componentDidMount(){
  
    window.addEventListener('keydown', e => {
    if (e.code === 'Escape') {
      console.log('Escape');
    }
  });
 }

  render(){
    const {img, alt, overlayClick} = this.props
    return (
          <div className={css.overlay} onClick={overlayClick}>
            <div className={css.modal}>
              <img src={img} alt={alt} />
            </div>
          </div>
        );
  }
}

// export const Modal = ({ img, alt, overlayClick }) => {
//   window.addEventListener('keydown', e => {
//     if (e.code === 'Escape') {
//       console.log('Escape');
//     }
//   });
//   return (
//     <div className={css.overlay} onClick={overlayClick}>
//       <div className={css.modal}>
//         <img src={img} alt={alt} />
//       </div>
//     </div>
//   );
// };
