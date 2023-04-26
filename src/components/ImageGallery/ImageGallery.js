import { GalleryList } from './ImageGallery.styled';
import { GalleryItem, GalleryImg } from './ImageGalleryItem.styled';

export function ImageGallery({ images, onClick }) {
  return (
    <GalleryList>
      {images.map(({ id, webformatURL, tags, largeImageURL }) => (
        <GalleryItem key={id} onClick={() => onClick(largeImageURL)}>
          <GalleryImg src={webformatURL} alt={tags} />
        </GalleryItem>
      ))}
    </GalleryList>
  );
}
