import React, { Component } from 'react';
import css from './App.module.css';
import toast, { Toaster } from 'react-hot-toast';

import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Searchbar } from '../Searchbar/Searchbar';
import { Loader } from '../Loader/Loader';
import { Button } from '../Button/Button';
import { getQuantityImg, respFromBack } from 'js/respFromBack';

const imgOnPage = 12;

export class App extends Component {
  state = {
    units: [],
    name: '',
    buttonActive: false,
    pagesView: 1,
    loader: false,
    error: false,
    galleryRender: false,
    allImages: null,
  };

  componentDidUpdate = async (prevProps, prevState) => {
    const { name, pagesView } = this.state;
    if (prevState.name !== name || prevState.pagesView !== pagesView) {
      const images = await getQuantityImg(name);
      this.setState({
        loader: true,
        error: false,
        galleryRender: true,
        allImages: images,
      });
      try {
        const responce = await respFromBack(name, pagesView, imgOnPage);
        if (responce.length > 0) {
          this.setState({
            units: responce,
            buttonActive: true,
          });
        } else {
          this.setState({
            units: responce,
            galleryRender: false,
          });
          toast('Nothing was found', {
            icon: '🟨',
          });
        }
        if (
          Math.ceil(this.state.allImages / imgOnPage) === this.state.pagesView
        ) {
          toast('That is all', {
            icon: '✅',
          });  
          this.setState({
            buttonActive: false,
          });
        }
      } catch (error) {
        this.setState({ error: true });
        toast('Error, Please reload this page!', {
          icon: '🟥',
        });
      } finally {
        this.setState({ loader: false });
      }    }
  };

  submitSearchbar = data => {
    this.setState({
      units: [],
      buttonActive: false,
      galleryRender: false,
    });

    if (data) {
      this.setState({
        name: data,
        pagesView: 1,
      });
    }
  };

  btnLoadClick = () => {
    this.setState(prevState => ({ pagesView: prevState.pagesView + 1 }));
     };

  render() {
    const { buttonActive, units, loader, error, galleryRender } = this.state;

    return (
      <div className={css.app}>
        <Searchbar onSubmitSearchbar={this.submitSearchbar} />
        {galleryRender && <ImageGallery units={units} />}
        {loader && <Loader />}
        {buttonActive && <Button onBtnLoadClick={this.btnLoadClick} />}
        {error && <div>Error, Please reload this page!</div>}
        <Toaster />
      </div>
    );
  }
}
