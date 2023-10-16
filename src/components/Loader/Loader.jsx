import css from './Loader.module.css';
import { Hourglass } from  'react-loader-spinner'

export const Loader = () => {
  return (
    <div className={css.loader}>
      <div>Loading...</div>
      <Hourglass
        visible={true}
        height="50"
        width="50"
        ariaLabel="hourglass-loading"
        wrapperStyle={{}}
        wrapperClass=""
        colors={['#306cce', '#72a1ed']} 
      />
    </div>
  );
};
