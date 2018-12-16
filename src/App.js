import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import './App.css';
import Navigation from './components/Navigation';
import Logo from './components/Logo/Logo';
import Form from './components/Form/Form';
import Rank from './components/Rank';
import Facerecognition from './components/Facerecognition';

const app = new Clarifai.App({apiKey: 'ApiKey'});

const particleParams = {
  particles: {
       number: {
                  value: 130,
                  density: {
                    enable: true, 
                    value_area: 800
                          }
                }
              }
           }


class App extends Component {
  constructor(){
    super()
    this.state = {
      input: '',
      imageUrl: '',
      box: {}
    }
  }


  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);
    return{
      leftCol:clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {this.setState({box: box}); console.log(box); }

  onInputChange = (event) => {this.setState({input: event.target.value}); } 

  onButtonSubmit = () => {
    this.setState(
      {
        imageUrl: this.state.input
      },
      () => {
        app.models
          .predict(Clarifai.FACE_DETECT_MODEL, {base64: this.state.imageUrl})
          .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
          .catch(err => console.log(err));
      }
    );
  } 


  render(){
    return(
      <div className="App">
      <Particles className='particles' params={particleParams} />
      <Navigation />
      <Logo />
      <Rank />
      <Form onInputChange={this.onInputChange}
            onButtonSubmit={this.onButtonSubmit}   />      
      <Facerecognition imageUrl={this.state.imageUrl} box = {this.state.box} />

      </div>
    );
  }
}


export default App;
