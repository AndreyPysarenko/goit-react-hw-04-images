import { useCallback, useEffect, useState } from 'react';
import Notiflix from 'notiflix';
import SearchBar from './Searchbar';
import Loader from './Loader';
import Button from './Button';
import ImageGallery from './ImageGallery';
import { getImageBySearch, PER_PAGE } from './Api/api-search';
import css from './App.module.css';

const App = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(true);

  const addImages = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getImageBySearch(searchQuery, page);
      const images = data.hits;

      if (images.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }

      const totalPages = Math.ceil(data.totalHits / PER_PAGE);
      const hasMoreImages = page < totalPages;

      setGalleryImages(prevState => [...prevState, ...images]);
      setIsLoading(false);
      setShowLoadMore(hasMoreImages);
    } catch {
      Notiflix.Notify.failure('Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, page]);

  useEffect(() => {
    if (!searchQuery) return;
    addImages();
  }, [searchQuery, addImages]);

  const handleSetSearchQuery = value => {
    setSearchQuery(value);
    setGalleryImages([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <div className={css.App}>
      <SearchBar onSubmit={handleSetSearchQuery} />

      {galleryImages.length > 0 && (
        <>
          <ImageGallery galleryImages={galleryImages} />
          {isLoading && <Loader />}
          {showLoadMore && <Button handleLoadMore={handleLoadMore} />}
        </>
      )}
    </div>
  );
};

export default App;
