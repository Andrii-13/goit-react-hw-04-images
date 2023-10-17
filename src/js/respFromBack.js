import { getFetch } from './api';

export const respFromBack = async (name, page, imgOnPage) => {
  let responce = [];
  for (let i = 1; i <= page; i += 1) {
    const {hits} = await getFetch(name, i, imgOnPage)
    responce = [...responce, ...hits]
  }
  return responce;
};


export const getQuantityImg = async(name) => {
  const {totalHits} = await getFetch(name, 1);
  return totalHits;
}