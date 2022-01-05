import { useContext } from 'react';
import { loadingContext } from './LoadingContext';

// TODO: add some style to loader
export const LoadingContainer = () => {
  const { isLoading } = useContext(loadingContext);

  const divStyle: React.CSSProperties =
    isLoading === true ? { opacity: '1' } : { opacity: '0', zIndex: '-200' };

  return <div style={divStyle}></div>;
};
