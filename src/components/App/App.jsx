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
    if (name === ''){
      return;
    }
    // if (
    //   setName(prevName => prevName) !== name ||
    //   setCurrentPage(prevCurrentPage => prevCurrentPage) !== currentPage
    // ) {
      try {
        setLoader(true);
        setError(false);
        const getResult = async () => {
          const { hits, totalHits } = await getFetch(name, currentPage);
          setUnits([...units, ...hits]);
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
    // }
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
      <ImageGallery units={units} />
      {loader && <Loader />}
      {buttonActive && <Button onBtnLoadClick={btnLoadClick} />}
      {error && <div>Error, Please reload this page!</div>}
      <Toaster />
    </div>
  );
};

// componentDidUpdate = async (prevProps, prevState) => {
//   const { name, currentPage, units } = this.state;
//   if (prevState.name !== name || prevState.currentPage !== currentPage) {
//
//

//
//       if (Math.ceil(totalHits / 12) === currentPage) {
//         toast('That is all', {
//           icon: '✅',
//         });
//         this.setState({
//           buttonActive: false,
//         });
//       }
//       if (hits.length === 0) {
//         toast('Nothing was found', {
//           icon: '🟨',
//         });
//         this.setState({
//           buttonActive: false,
//         });
//       }//
//   }
// };
