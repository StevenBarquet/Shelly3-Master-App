import React, { useState } from 'react';

const FitImg = props => {
  const [ratioStyle, setRatioStyle] = useState('ancha');
  const { srcImg, estilo, alt, onClick } = props;
  const onImgLoad = ({ target: img }) => {
    if (img.naturalHeight > img.naturalWidth) {
      setRatioStyle('alta');
    }
  };
  return (
    <button
      type="button"
      onClick={onClick}
      className={estilo + ' ' + ratioStyle}
    >
      <img onLoad={onImgLoad} src={srcImg} alt={alt} />
    </button>
  );
};

export default FitImg;
