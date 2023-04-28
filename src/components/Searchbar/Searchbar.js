import { Component } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import PropTypes from 'prop-types';
import {
  Header,
  Form,
  ButtonForm,
  ButtonLabel,
  Input,
} from './Searchbar.styled';
export class SearchBar extends Component {
  state = {
    searchName: '',
  };

  handleInputChange = e => {
    this.setState({ searchName: e.currentTarget.value.toLowerCase() });
  };

  handleFormSubmit = e => {
    e.preventDefault();

    if (this.state.searchName.trim() === '') {
      alert('Enter name!');
      return;
    }
    this.props.onSubmit(this.state.searchName.trim());

    this.reset();
  };

  reset = () => {
    this.setState({ searchName: '' });
  };

  render() {
    const { searchName } = this.state;
    return (
      <Header>
        <Form onSubmit={this.handleFormSubmit}>
          <ButtonForm type="submit">
            <IconContext.Provider value={{ size: '2em' }}>
              <AiOutlineSearch />
            </IconContext.Provider>
            <ButtonLabel>Search</ButtonLabel>
          </ButtonForm>

          <Input
            onChange={this.handleInputChange}
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchName}
          />
        </Form>
      </Header>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
