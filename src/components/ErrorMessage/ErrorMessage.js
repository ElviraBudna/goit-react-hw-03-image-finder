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

// ContactForm.propTypes = {
//     handleInputChange: PropTypes.func,
//     contacts: PropTypes.arrayOf(
//         PropTypes.shape({
//             name: PropTypes.string.isRequired,
//             number: PropTypes.string.isRequired,
//         })
//     ),
// }
