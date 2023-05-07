import { useState } from 'react';
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
  const [images, setImages] = useState[null];
  const [pageNum, setPageNum] = useState[2];
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalImg, setModalImg] = useState(null);
  const [btnVision, setBtnVision] = useState(true);
  const [error, setError] = useState(null);
  const [isLoadingSpinner, setIsLoadingSpinner] = useState(false);

  const acceptSearch = async search => {
    if (this.state.search === search || search === '') {
      return;
    }

    try {
      this.setState({ images: null });
      this.setState({ isLoading: true });
      this.setState({ search: search });
      this.setState({ pageNum: 2 });
      this.setState({ btnVision: true });

      const response = await fetchImage(search);
      this.setState({ images: response.hits });

      if (response.total === 0) {
        this.setState({ error: errorMassage(search) });
      }
    } catch {
      this.setState({ error: ErrorData() });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  const onClickPageUp = async () => {
    try {
      this.setState({ isLoadingSpinner: true });
      const { pageNum, search } = this.state;
      this.setState(prevState => {
        return { pageNum: prevState.pageNum + 1 };
      });
      const response = await fetchImage(search, pageNum);

      const nextPictures = response.hits;
      if (nextPictures.length < 1) {
        this.setState({ btnVision: false });
        Report.info(
          "That's all",
          "We're sorry, but you've reached the end of search results.",
          'Okay'
        );
        return;
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...nextPictures],
      }));
    } catch {
      this.setState({ error: ErrorData() });
    } finally {
      this.setState({ isLoading: false });
      this.setState({ isLoadingSpinner: false });
    }
  };

  const toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  const updateModalPicture = img => {
    this.setState({ modalImg: img });
  };

  return (
    <>
      <Container>
        <Searchbar onSubmit={acceptSearch} />
        {isLoading && <Loader />}

        {error && error}

        {images && (
          <ImageGallery
            images={images}
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
