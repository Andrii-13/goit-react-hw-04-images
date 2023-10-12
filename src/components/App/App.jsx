import React, { Component } from 'react';
import css from './App.module.css';

import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Searchbar } from '../Searchbar/Searchbar';
import { Loader } from '../Loader/Loader';
import { Button } from '../Button/Button';

export class App extends Component {
  state = {
    
  };

  render() {
    return (
      <div className={css.app}>
        <Searchbar />
        <ImageGallery />
        <Loader />
        <Button />
      </div>
    );
  }
}
