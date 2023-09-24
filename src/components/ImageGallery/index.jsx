import { useState } from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem';
import css from './ImageGallery.module.css';
import Modal from 'components/Modal';
import PropTypes from 'prop-types';

const ImageGallery = ({ galleryImages }) => {
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const openModal = largeImageURL => {
    setLargeImageURL(largeImageURL);
    setShowModal(true);
  };

  const closeModal = () => {
    setLargeImageURL(null);
    setShowModal(false);
  };

  return (
    <>
      <ul className={css.ImageGallery}>
        {galleryImages.map(({ id, webformatURL, largeImageURL, tags }) => (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            tags={tags}
            onOpenModal={() => openModal(largeImageURL)}
          />
        ))}
        {showModal && (
          <Modal largeImageURL={largeImageURL} onClose={closeModal} />
        )}
      </ul>
    </>
  );
};

ImageGallery.propTypes = {
  galleryImages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default ImageGallery;
