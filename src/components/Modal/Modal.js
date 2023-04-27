import PropTypes from 'prop-types';
import { Component } from 'react';
import { DivOverlay, DivModal } from './Modal.styled';
export default class Modal extends Component {
  componentDidMount() {
    // console.log('Modal componentDidMount');
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    // console.log('Modal componentWillUnmount');
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    // console.log(e.code);
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    return (
      <DivOverlay onClick={this.handleBackdropClick}>
        <DivModal>{this.props.children}</DivModal>
      </DivOverlay>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
