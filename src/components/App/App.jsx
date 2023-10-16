import React, { Component } from 'react';
import css from './App.module.css';
import toast, { Toaster } from 'react-hot-toast';

import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Searchbar } from '../Searchbar/Searchbar';
import { Loader } from '../Loader/Loader';
import { Button } from '../Button/Button';
import { respFromBack } from 'js/respFromBack';

export class App extends Component {
  state = {
    units: [],
    name: '',
    buttonActive: false,
    pagesView: 1,
    loader: false,
    error: false,
    galleryRender: false,
  };

  componentDidUpdate = async (prevProps, prevState) => {
    const { name, pagesView } = this.state;
    if (prevState.name !== name || prevState.pagesView !== pagesView) {
      if(!name){
        this.setState({
          name: '',
          galleryRender: false,
        });
        return
      }
      this.setState({
        loader: true,
        error: false,
        galleryRender: true,
      });
      try {
        const responce = await respFromBack(name, pagesView);
          console.log(responce);
        if (responce.length >= 1) {
          this.setState({
            units: responce,
            buttonActive: true,
          });
        } else {
          this.setState({
            galleryRender: false,
          });
          toast('Nothing was found', {
            icon: '🟨',
          });
        }
      } catch (error) {
        this.setState({ error: true });
        toast('Error, Please reload this page!', {
          icon: '🟥',
        });
      } finally {
        this.setState({ loader: false });
      }
    }
  };

  submitSearchbar = data => {
    console.log(data);
    this.setState({
      name: '',
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
