import { getFetch } from './api';

export let totalImg;

export const respFromBack = async (name, page) => {
  let responce = [];
  for (let i = 1; i <= page; i += 1) {
    const {hits, totalHits} = await getFetch(name, i)
    totalImg = totalHits;
    responce = [...responce, ...hits]
  }
  return responce;
};
