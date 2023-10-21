import React, { useEffect, useState } from 'react';
import css from './App.module.css';
import toast, { Toaster } from 'react-hot-toast';

import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Searchbar } from '../Searchbar/Searchbar';
import { Loader } from '../Loader/Loader';
import { Button } from '../Button/Button';
import { getFetch } from 'js/api';

export const App = () => {
  const [name, setName] = useState('');
  const [units, setUnits] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [buttonActive, setButtonActive] = useState(false);

  useEffect(() => {
    if (name === '') {
      return;
    }

    try {
      setLoader(true);
      setError(false);
      const getResult = async () => {
        const { hits, totalHits } = await getFetch(name, currentPage);
        setUnits(prevUnits => [...prevUnits, ...hits]);
        setButtonActive(true);
        if (Math.ceil(totalHits / 12) === currentPage) {
          toast('That is all', {
            icon: '✅',
          });

          setButtonActive(false);
        }
        if (hits.length === 0) {
          toast('Nothing was found', {
            icon: '🟨',
          });
          setButtonActive(false);
        }
      };
      getResult();
    } catch {
      setError(true);
      toast('Error, Please reload this page!', {
        icon: '🟥',
      });
    } finally {
      setLoader(false);
    }
  }, [name, currentPage]);

  const submitSearchbar = data => {
    setName(data);
    setUnits([]);
    setCurrentPage(1);
  };

  const btnLoadClick = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  return (
    <div className={css.app}>
      <Searchbar onSubmitSearchbar={submitSearchbar} />
      {units.length > 0 && <ImageGallery units={units} />}
      {loader && <Loader />}
      {buttonActive && name && <Button onBtnLoadClick={btnLoadClick} />}
      {error && <div>Error, Please reload this page!</div>}
      <Toaster />
    </div>
  );
};
