import React from 'react'
const bcrypt = require('bcrypt-nodejs');

class Register extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      registerFailure : false
    }
  }

  nameChange = (e) =>{
    this.setState({name: e.target.value})
  }    
  emailChange = (e) =>{
    this.setState({email: e.target.value})
  }  
  passwordChange = (e) =>{
    this.setState({password: e.target.value})
  }

  submitRegister = (e) =>{ 
    e.preventDefault(); 
    //console.log(this.state);
    fetch('https://maxon-face-recognition-app.herokuapp.com/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name,
      })
    })
      .then(response=> response.json())
      .then(user =>{
        if(user.email){
          this.props.loadUser(user);
          //console.log(user)
          const number = user.id *37
          const user_token_hash = bcrypt.hashSync(user.email); 
          this.props.routeChange('home');
          localStorage.setItem('persistantUserToken_one',number);
          localStorage.setItem('persistantUserToken_two',user_token_hash);
        }
        if(user === 'All fields are required'){
          //console.log(user)
          this.setState({loginFailure: true})
        }
      })
    
  }

  render() {
    const {routeChange} = this.props
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
    <main className="pa4 black-80">
      <form className="measure">
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <legend className="f1 fw6 ph0 mh0">Register</legend>
          <div className="mt3">
            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
            <input 
            onChange = {this.nameChange}
            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
            type="text" 
            name="name"  
            id="name"/>
          </div>       
           <div className="mt3">
            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
            <input 
            onChange = {this.emailChange}
            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
            type="email" 
            name="email-address" 
            autoComplete="email" 
            id="email-address"/>
          </div>
          <div className="mv3">
            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
            <input 
            onChange = {this.passwordChange}
            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
            type="password" 
            name="password"  
            autoComplete="new-password"
            id="password"/>
          </div>
        </fieldset>
        {this.state.loginFailure? <p className='fail_attempt'>All fields are required.</p> : <p></p>}
        <div className="">
          <input 
          onClick={this.submitRegister}
          className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register"/>
        </div>
        <div onClick={() =>routeChange('signin')}

        className="lh-copy mt3">
          <p  href="#0" className="f6 link dim black db pointer">Login</p>
        </div>
      </form>
    </main>
  </article>
    )
  }

}

export default Register
