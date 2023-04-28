// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { Loader } from 'components/Loader/Loader';
import axios from 'axios';
import { SearchBar } from 'components/Searchbar/Searchbar';
import { Component } from 'react';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { AppContainer } from './App.styled';
import ButtonLoadMore from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import { ErrorMessage } from 'components/ErrorMessage/ErrorMessage';

const BASE_URL = 'https://pixabay.com/api/';
const MY_KEY = '34502026-b3b6775c6b884fa93647474e5';
const OPTION_FOR_RESPONSE = 'image_type=photo&orientation=horizontal';

export class App extends Component {
  state = {
    searchName: null,
    photos: [],
    largeImageURL: '',
    loading: false,
    page: 1,
    perPage: 12,
    showModal: false,
    loadMore: false,
    error: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.searchName !== this.state.searchName) {
      await this.setState({
        page: 1,
        photos: [],
        loadMore: false,
        loading: true,
        error: false,
      });

      await this.fetchApi().then(photo => this.setState({ photos: photo }));
    } else if (prevState.page !== this.state.page) {
      this.fetchApi().then(photo =>
        this.setState(prevState => ({
          photos: [...prevState.photos, ...photo],
        }))
      );
    }
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  formSubmitHandler = data => {
    this.setState({ searchName: data });
  };

  onClickImg = item => {
    this.setState({ largeImageURL: item });
    this.toggleModal();
  };

  onClickLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleImageClick = largeImageURL => {
    this.setState({ showModal: true, largeImageURL });
  };

  async fetchApi() {
    const { searchName, page, perPage } = this.state;
    try {
      const response = await axios.get(
        `${BASE_URL}?key=${MY_KEY}&q=${searchName}&${OPTION_FOR_RESPONSE}&page=${page}&per_page=${perPage}`
      );

      let hits = response.data.hits;

      if (hits) {
        hits = hits.map(({ id, largeImageURL, webformatURL, tags }) => ({
          id,
          largeImageURL,
          webformatURL,
          tags,
        }));

        if (hits.length === 0) {
          this.setState({ loadMore: false, error: true });
        }
      }

      const totalHits = response.data.totalHits;

      if (totalHits > page * perPage) {
        this.setState({ loadMore: true });
      } else {
        this.setState({ loadMore: false });
      }

      return hits;
    } catch (error) {
      this.setState({ photos: [], loadMore: false, error: true });
      console.log(error);
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const {
      loading,
      photos,
      searchName,
      showModal,
      largeImageURL,
      loadMore,
      error,
    } = this.state;

    return (
      <AppContainer>
        <SearchBar onSubmit={this.formSubmitHandler} />
        {loading && <Loader />}
        {error && <ErrorMessage name={searchName} />}
        {photos.length > 0 && (
          <ImageGallery photos={photos} onClick={this.onClickImg} />
        )}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageURL} alt="" />
          </Modal>
        )}
        {loadMore && <ButtonLoadMore onClick={this.onClickLoadMore} />}
      </AppContainer>
    );
  }
}
