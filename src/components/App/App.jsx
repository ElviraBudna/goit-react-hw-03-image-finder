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
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    // console.log(prevState);
    // console.log(this.state);
    if (prevState.searchName !== this.state.searchName) {
      // console.log('update');
      this.setState({ page: 1, images: [], loadMore: false, loading: true });
      this.fetchApi()
        .then(photo => this.setState({ photos: photo }))
        .finally(() => this.setState({ loading: false }))
        .catch(error => {
          console.log(error);
          this.setState({ error });
        });
    } else if (prevState.page !== this.state.page) {
      this.fetchApi()
        .then(photo =>
          this.setState(prevState => ({
            photos: [...prevState.photos, ...photo],
          }))
        )
        .catch(error => {
          console.log(error);
          this.setState({ error });
        })
        .finally(() => this.setState({ loading: false }));
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

  oncClickImg = item => {
    this.setState({ largeImageURL: item });
    this.toggleModal();
  };

  onClickLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
    // this.fetchApi()
    //   .then(photo =>
    //     this.setState(prevState => ({
    //       photos: { ...prevState.photos, ...photo },
    //     }))
    //   )
    //   .finally(() => this.setState({ loading: false }));
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

      const hits = response.data.hits.map(
        ({ id, largeImageURL, webformatURL }) => ({
          id,
          largeImageURL,
          webformatURL,
        })
      );

      // console.log(hits.length);
      if (hits.length === 0) {
        this.setState({ photos: [], loadMore: false, error: true });
        return;
      }

      // console.log(response.data);
      const totalHits = response.data.totalHits;
      // console.log(totalHits);

      // if (page === 1) {
      //   this.setState({ photos: hits });
      // } else {
      //   // this.setState(prevState => ({
      //   //   photos: [...prevState.photos, ...hits],
      //   // }));
      // }

      if (totalHits > page * perPage) {
        this.setState({ loadMore: true });
      } else {
        this.setState({ loadMore: false });
      }

      // console.log(response.data.hits);
      return hits;
    } catch (error) {
      // this.setState({ error });
      this.setState({ photos: [], loadMore: false, error: true });
      console.log(error);
    }
    // finally {
    //   this.setState({ loading: false });
    // }
  }

  render() {
    const { loading, photos, showModal, largeImageURL, loadMore, error } =
      this.state;

    return (
      <AppContainer>
        <SearchBar onSubmit={this.formSubmitHandler} />
        {loading && <Loader />}
        {error && <h2>error={'Sorry, nothing was found for your request'}</h2>}
        {photos.length > 0 && (
          <ImageGallery images={photos} onClick={this.oncClickImg} />
        )}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageURL} alt="" />
          </Modal>
        )}
        {loadMore && <ButtonLoadMore onClick={this.onClickLoadMore} />}
        {/* <ToastContainer autoClose={3000} /> */}
      </AppContainer>
    );
  }
}
