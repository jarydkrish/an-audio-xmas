import PropTypes from 'prop-types';

const FrequencyGraph = ({ value }) => {
  let ratio = 0;
  if (value < 200) {
    ratio = value / 200
  } else {
    ratio = 1
  }

  const percent = ratio * 100;
  return (
    <div className="progress my-1">
      <div className="progress-bar" role="progressbar" style={{ width: `${percent}%` }} aria-valuenow={percent} aria-valuemin={percent} aria-valuemax="100"></div>
    </div>
  );
}

FrequencyGraph.propTypes = {
  value: PropTypes.number.isRequired,
}

export default FrequencyGraph;
