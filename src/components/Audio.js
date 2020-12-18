import { Component } from 'react';

import FrequencyGraph from './audio/FrequencyGraph';

const AudioContext = window.AudioContext || window.webkitAudioContext;

export default class Audio extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stream: null,
      listening: false,
      frequencyArray: new Uint8Array(),
    };
    this.audioContext = null;
    this.analyser = null;
  }

  toggleListening = () => {
    const { listening } = this.state;
    if (listening) {
      this.setState({ listening: false });
    } else {
      this.setState({ listening: true });
      this.startListening();
    }
  }

  startListening = () => {
    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      .then((stream) => {
        this.audioContext = new AudioContext();
        this.setState({ stream });
        this.soundAllowed();
      });
  }

  soundAllowed = () => {
    const { stream } = this.state;
    const audioStream = this.audioContext.createMediaStreamSource( stream );
    this.analyser = this.audioContext.createAnalyser();
    const fftSize = 32;

    this.analyser.fftSize = fftSize;
    audioStream.connect(this.analyser);

    const bufferLength = this.analyser.frequencyBinCount;
    const frequencyArray = new Uint8Array(bufferLength);
    this.setState({ frequencyArray });
    this.listen();
  }

  listen = () => {
    const { listening, frequencyArray } = this.state;
    if (listening) {
      const newFrequencyArray = new Uint8Array(frequencyArray);
      this.analyser.getByteFrequencyData(newFrequencyArray);
      this.setState({ frequencyArray: newFrequencyArray });
      requestAnimationFrame(this.listen);
    }
  }

  render() {
    const { listening, frequencyArray } = this.state;
    const values = [ ...frequencyArray ];

    return (
      <div>
        <div className="alert alert-info text-center" role="alert">
          Use your microphone to create some holiday spirit! Simply click the button below and sing a song!
        </div>
        <div className="d-grid gap-2 mb-5">
          <button className={`btn btn-block ${listening ? 'btn-danger' : 'btn-success'}`} onClick={this.toggleListening}>
            {listening ? 'Stop' : 'Start'} Listening
          </button>
        </div>
        {values.map((value, index) => (
          <FrequencyGraph key={index} index={index} value={value} />
        ))}
      </div>
    );
  }
}
