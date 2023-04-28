import PropTypes from 'prop-types';
import { Component } from 'react';
import { DivOverlay, DivModal } from './Modal.styled';
export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
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
