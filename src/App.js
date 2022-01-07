import './App.css';
import  Clarifai from 'clarifai';
import Navigation from './Components/Navigation/Navigation';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Signin from './Components/Signin/Signin.jsx';
import Register from './Components/Register/Register.jsx';
import Logo from './Components/Logo/Logo';
import ImgLinkForm from './Components/ImgLinkForm/ImgLinkForm';
import Rank from './Components/Rank/Rank';
import Particles from 'react-particles-js';
import { Component } from 'react/cjs/react.production.min';
import React from 'react';
//import Cookies from 'universal-cookie'


const app = new Clarifai.App({
  apiKey: '958d9f722557479eb7ef3373b5f9c858'
});




/**const cookies = new Cookies(); 
const authToken = false;


if(authToken) {
  client.connectUser({
    id: cookies.get('userId'),
    name: cookies.get('username'),
    fullName: cookies.get('fullName'),
    phoneNumber: cookies.get('phoneNumber'),
    image: cookies.get('avatarURL'),
    hashedPassword: cookies.get('hashedPassword'),
  }, authToken);
}
*/


class App extends Component{
  constructor() {
    super();
    this.state = {
      input: '',
      imageURL: '',
      box: {},
      route: 'signin',
      isIn: false,
      user: {
        id: "",
        name: '',
        email: '',
        points: 0,
        joined: '',
        
      }, 
    }    

  }


  loadUser = (loadedUser) =>{
    this.setState({
      user:{
        id: loadedUser.id,
        name: loadedUser.name,
        email: loadedUser.email,
        points: loadedUser.points,
        joined: loadedUser.joined,
      }
    })
  }
  componentDidMount() {
    const number = localStorage.getItem('persistantUserToken_one')
    const token = localStorage.getItem('persistantUserToken_two')
    if(number && token){
      fetch(`https://maxon-face-recognition-app.herokuapp.com/profile/${number}`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        token: token,
      })
    })
      .then(response=> response.json())
      .then(user =>{
        if(user.email){
          this.loadUser(user);
          this.routeChange('home');
        }
      })
    }
    
    
  }

  findFace = (data) =>{
    const face_location = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('test_img');
    const width = Number(image.width);
    const height = Number(image.height);
    //console.log(width, height);
    return{
      left: face_location.left_col * width,
      top: face_location.top_row * height,
      right: width - (face_location.right_col * width),
      bottom: height - (face_location.bottom_row *height),
    }
  }

  displayFace = (box) =>{
    //console.log(box)
    this.setState({box: box});
  }
  onInputChange = (e)=>{
    this.setState({input: e.target.value})
    //console.log(e.target.value);
    
  }
  onImportSubmit = () =>{
    this.setState({imageURL: this.state.input})
    //console.log("click");
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.input)
      .then( response => {
        if(response){
          fetch('https://maxon-face-recognition-app.herokuapp.com/image',{
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { points: count}))
            })
          }
          this.displayFace(this.findFace(response))
          // console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
        })
        .catch(err => console.log(err)); 
      }

  routeChange = (route) =>{
    //can destructure here if desired and remove this.state
    if(route === 'signout'){
      this.setState({isIn: false});
      localStorage.removeItem("persistantUserToken_one");
      localStorage.removeItem("persistantUserToken_two");
      this.setState({imageURL: ''})

    }else if(route ==='home'){
      this.setState({isIn: true})
    }
    this.setState({route:route});
    
  }
  render(){
  return (
    <div className="App">
      <Particles className = 'particles'
      params={{
        "particles": {
            "number": {
                "value": 150
            },
            "density": {
              "enable": true,
              "value_area": 800
            }
        },
    }}
      />
      
      <Navigation routeChange = {this.routeChange} isIn = {this.state.isIn}/>
      { this.state.route === 'home' ?
          <div> 
            <Logo/>
            <Rank name={this.state.user.name}
                points={this.state.user.points}/>
            <ImgLinkForm onInputChange = {this.onInputChange} onImportSubmit = {this.onImportSubmit}/>
            <FaceRecognition box ={this.state.box} imageURL = {this.state.imageURL}/>
          </div>
        :(
          this.state.route === 'signin' ?
          <Signin loadUser ={this.loadUser} routeChange = {this.routeChange}/>
          :
          <Register loadUser={this.loadUser} routeChange = {this.routeChange}/>
        )

      }
      
    </div>
  );
}
}
export default App;
