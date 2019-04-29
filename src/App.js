import React, { Component } from 'react';
import Particles from 'react-particles-js';
import './App.css';
import Navigation from './components/Navigation';
import Logo from './components/Logo/Logo';
import Form from './components/Form/Form';
import Rank from './components/Rank';
import Facerecognition from './components/Facerecognition/Facerecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';

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

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }


  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height
    };
  };

  displayFaceBox = (box) => {this.setState({box: box}); }

  onInputChange = (event) => {this.setState({input: event.target.value}); } 

   onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
      fetch('https://secret-fjord-10029.herokuapp.com/imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://secret-fjord-10029.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })
            .catch(console.log)

        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

    onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }


  render(){

    const {isSignedIn, imageUrl, box, route} = this.state;

    return(
      <div className="App">

      <Particles className='particles' params={particleParams} />
      <Navigation isSignedIn = {isSignedIn} onRouteChange = {this.onRouteChange} />

      {route === 'home' 

      ? <div>
        <Logo />
        <Rank name={this.state.user.name} entries={this.state.user.entries}/>
        <Form onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />      
        <Facerecognition imageUrl={imageUrl} box = {box} />
      </div>

      : (route === 'signin'
         ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
         : <Register loadUser = {this.loadUser} onRouteChange = {this.onRouteChange} />
        )

      }

      </div>
    );
  }
}


export default App;
