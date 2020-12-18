import PropTypes from 'prop-types';

const FrequencyGraph = ({ index, value }) => {
  let ratio = 0;
  if (value < 200) {
    ratio = value / 200
  } else {
    ratio = 1
  }

  let bg = 'bg-success';
  if (index % 2 === 1) {
    bg = 'bg-danger'
  }
  if (index % 3 === 0) {
    bg = 'bg-primary'
  }

  const percent = ratio * 100;
  return (
    <div className="progress my-1">
      <div className={`progress-bar ${bg}`} role="progressbar" style={{ width: `${percent}%` }} aria-valuenow={percent} aria-valuemin={percent} aria-valuemax="100"></div>
    </div>
  );
}

FrequencyGraph.propTypes = {
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
}

export default FrequencyGraph;
