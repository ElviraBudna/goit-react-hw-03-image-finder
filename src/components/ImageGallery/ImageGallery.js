import PropTypes from 'prop-types';
import { GalleryList } from './ImageGallery.styled';
import { GalleryItem, GalleryImg } from './ImageGalleryItem.styled';

export function ImageGallery({ photos, onClick }) {
  return (
    <GalleryList>
      {photos.map(({ id, webformatURL, tags, largeImageURL }) => (
        <GalleryItem key={id} onClick={() => onClick(largeImageURL)}>
          <GalleryImg src={webformatURL} alt={tags} />
        </GalleryItem>
      ))}
    </GalleryList>
  );
}

ImageGallery.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  onClick: PropTypes.func.isRequired,
};
