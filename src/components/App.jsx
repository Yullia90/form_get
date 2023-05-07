import { useState, useEffect } from 'react';
import { Report } from 'notiflix/build/notiflix-report-aio';

import { fetchImage } from './Api/api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMoreBtn } from './Button/Button';
import { Loader } from './Loader/Loader';

import { Modal } from './Modal/Modal';

import { errorMassage } from './Error/errorMessage';
import { ErrorData } from './Error/ErrorData/ErrorData';

import { Container } from './App.styled';

export function App() {
  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [error, setError] = useState(null);

  const [btnVision, setBtnVision] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSpinner, setIsLoadingSpinner] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [modalImg, setModalImg] = useState(null);

  useEffect(() => {
    if (!search) {
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoadingSpinner(true);
        setBtnVision(true);

        if (pageNum === 1) {
          setIsLoading(true);
        }

        const response = await fetchImage(search, pageNum);

        setImages(prevImage => [...prevImage, ...response.hits]);

        if (response.total === 0) {
          setError(errorMassage(search));
        }
        if (response.hits.length < 1) {
          setBtnVision(false);
          Report.info(
            "That's all",
            "We're sorry, but you've reached the end of search results.",
            'Okay'
          );
          return;
        }
      } catch {
        setError(ErrorData());
      } finally {
        setIsLoading(false);
        setIsLoadingSpinner(false);
      }
    };

    fetchData();
  }, [pageNum, search]);

  const acceptSearch = queryImg => {
    if (queryImg === search) {
      return;
    }
    setImages([]);
    setPageNum(1);
    setSearch(queryImg);
  };

  const onClickPageUp = () => {
    setPageNum(pageNum + 1);
  };

  const toggleModal = () => {
    setShowModal(prevShowModal => (prevShowModal = !showModal));
  };

  const updateModalPicture = img => {
    setModalImg(img);
  };

  return (
    <>
      <Container>
        <Searchbar onSubmit={acceptSearch} />
        {isLoading && <Loader />}

        {error && error}

        {images && (
          <ImageGallery
            items={images}
            onClick={toggleModal}
            onUpdateModalPicture={updateModalPicture}
          />
        )}
        {images && images.length > 0 && btnVision && (
          <>
            <LoadMoreBtn
              onLoadMore={onClickPageUp}
              isLoadingSpin={isLoadingSpinner}
            />
          </>
        )}

        {showModal && <Modal onClose={toggleModal} onGiveImg={modalImg} />}
      </Container>
    </>
  );
}
