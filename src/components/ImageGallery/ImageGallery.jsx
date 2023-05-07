import PropTypes from 'prop-types';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

import { Gallery } from './ImageGallery.styled';

export const ImageGallery = ({ items, onClick, onUpdateModalPicture }) => {
  return (
    <Gallery>
      {items.map(item => (
        <ImageGalleryItem
          key={item.id}
          images={item}
          onClick={onClick}
          onGiveImg={onUpdateModalPicture}
        />
      ))}
    </Gallery>
  );
};

ImageGallery.propTypes = {
  items: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  onUpdateModalPicture: PropTypes.func.isRequired,
};
