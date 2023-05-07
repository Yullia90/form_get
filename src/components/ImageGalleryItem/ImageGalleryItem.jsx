import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ images, onClick, onGiveImg }) => {
  const { webFormatURL, tags } = images;
  return (
    <GalleryItem>
      <GalleryItemImage
        src={webFormatURL}
        alt={tags}
        onClick={() => {
          onClick();
          onGiveImg(images);
        }}
      />
    </GalleryItem>
  );
};
