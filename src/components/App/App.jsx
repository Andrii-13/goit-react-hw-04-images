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
    // totalImg: 0,
    loader: false,
    error: false,
  };

  componentDidUpdate = async (prevProps, prevState) => {
    const { name, pagesView } = this.state;
    if (prevState.name !== name || prevState.pagesView !== pagesView) {
      this.setState({
        loader: true, error: false,
      });
      try {
        const responce = await respFromBack(name, pagesView);
        this.setState({
          units: responce,
          buttonActive: true,
        });
      } catch (error) {
        this.setState({ error: true });
      } finally {
        this.setState({ loader: false });
      }
    }
  };

  submitSearchbar = data => {
    if (!data.trim()) {
      toast.error('You enter empty query');
      return;
    }
    console.log(this.state.units.length);
    if (this.state.units.length < 1) {
      toast.error('nothing found');
      this.setState({
        buttonActive: false,
      });
    }
    this.setState({
      name: data.trim(),
      pagesView: 1,
    });
  };

  btnLoadClick = () => {
    this.setState(prevState => ({ pagesView: prevState.pagesView + 1 }));
  };

  render() {
    const { buttonActive, units, loader,error } = this.state;
    return (
      <div className={css.app}>
        <Searchbar onSubmitSearchbar={this.submitSearchbar} />
        <ImageGallery units={units} />
        {loader && <Loader />}
        {buttonActive && <Button onBtnLoadClick={this.btnLoadClick} />}
        {error && <div>Error, Please reload this page!</div>}
        <Toaster />
      </div>
    );
  }
}
