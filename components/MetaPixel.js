'use client';

import { useEffect } from 'react';
import ReactPixel from 'react-facebook-pixel';

const MetaPixel = ({ pixelId }) => {
  useEffect(() => {
    ReactPixel.init(pixelId);
    ReactPixel.pageView();
  }, [pixelId]);

  return null;
};

export default MetaPixel;