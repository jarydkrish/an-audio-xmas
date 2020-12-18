import Audio from './components/Audio';

import image from './social.png';

const App = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col mt-5 p-3">
          <div className="text-center">
            <img style={{ maxWidth: '300px' }} className="img-fluid" src={image} alt="An Audio Xmas" />
          </div>
          <Audio />
        </div>
      </div>
    </div>
  );
}

export default App;
