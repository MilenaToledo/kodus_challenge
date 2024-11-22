
import '../styles/ResponseBox.css';
import PropTypes from 'prop-types';

const ResponseBox = ({ response }) => {
  return (
    <div className="response-box">
      {response ? <p>{response}</p> : <p>Ask a question to get an answer!</p>}
    </div>
  );
};

ResponseBox.propTypes = {
    response: PropTypes.string, 
  };

export default ResponseBox;
