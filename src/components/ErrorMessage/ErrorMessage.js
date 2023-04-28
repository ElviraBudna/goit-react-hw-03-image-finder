import PropTypes from 'prop-types';
import { ErrorMessageContainer } from './ErrorMessage.styled';

export function ErrorMessage({ name }) {
  return (
    <ErrorMessageContainer>
      <h2>Sorry, nothing was found for your request {name}</h2>
    </ErrorMessageContainer>
  );
}

ErrorMessage.propTypes = {
  name: PropTypes.string.isRequired,
};
