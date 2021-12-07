import PropTypes from 'prop-types';
import React from 'react';
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';

import styles from './Banner.module.css';

const AutoplaySlider = withAutoplay(AwesomeSlider);

export const Banner = ({ banners }) => (
  <div className={styles.wrapper}>
    <AutoplaySlider
      animation="cubeAnimation"
      play={true}
      cancelOnInteraction={false}
      interval={6000}
      bullets={false}
    >
      {banners.map((banner) => (
        <div key={banner} data-src={banner} />
      ))}
    </AutoplaySlider>
  </div>
);

Banner.propTypes = {
  banners: PropTypes.array.isRequired,
};

Banner.defaultProps = {
  banners: [],
};

export default Banner;
