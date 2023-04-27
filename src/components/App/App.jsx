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

  componentDidUpdate(prevProps, prevState) {
    // console.log(prevState);
    // console.log(this.state);
    if (prevState.searchName !== this.state.searchName) {
      // console.log('update');
      this.setState({
        page: 1,
        photos: [],
        loadMore: false,
        loading: true,
        error: false,
      });
      this.fetchApi()
        .then(photo => this.setState({ photos: photo }))
        .finally(() => this.setState({ loading: false }));
      // .catch(error => {
      //   console.log(error);
      //   this.setState({ error: true });
      // });
    } else if (prevState.page !== this.state.page) {
      this.fetchApi()
        .then(photo =>
          this.setState(prevState => ({
            photos: [...prevState.photos, ...photo],
            // error: false,
          }))
        )
        // .catch(error => {
        //   console.log(error);
        //   this.setState({ error });
        // })
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

      const hits = response.data.hits;

      if (hits) {
        // console.log(hits === true);
        hits.map(({ id, largeImageURL, webformatURL }) => ({
          id,
          largeImageURL,
          webformatURL,
        }));

        // console.log(hits.length);
        // console.log(hits === []);
        // console.log(hits.length === 0);
        if (hits.length === 0) {
          // console.log(hits.length === 0);
          this.setState({ loadMore: false, error: true });
        }

        // if (this.state.photos.length === 0) {
        //   console.log(this.state.photos.length === 0);
        //   this.setState({ loadMore: false, error: true });
        //   return;
        // }
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
          <ImageGallery photos={photos} onClick={this.oncClickImg} />
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
