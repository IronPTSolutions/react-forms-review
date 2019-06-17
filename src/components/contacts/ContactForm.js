import React, { Component } from 'react'

// eslint-disable-next-line no-useless-escape
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const PHONE_NUMBER_PATTERN = /[67]{1}[0-9]{8}/i;


const validations = {
  name: (value) => {
    let message;
    if (!value) message = 'Name is required'
    else if (value.length < 3) message = 'Name must contains at least 3 chars'
    return message;
  },
  email: (value) => {
    let message;
    if (!value) message = 'Email is required'
    else if (!EMAIL_PATTERN.test(value)) message = 'Invalid email pattern'
    return message;
  },
  phoneNumber: (value) => {
    let message;
    if (!value) message = 'Phone number is required'
    else if (!PHONE_NUMBER_PATTERN.test(value)) message = 'Invalid phone number pattern'
    return message;
  }
}

class ContactForm extends Component {
  state = {
    contact: {
      name: '',
      email: '',
      phoneNumber: ''
    },
    errors: {
      name: validations.name(''),
      email: validations.email('')
    },
    touch: {}
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      contact: {
        ...this.state.contact,
        [name]: value
      },
      errors: {
        ...this.state.errors,
        [name]: validations[name] && validations[name](value)
      }
    })
  }

  handleBlur = (event) => {
    const { name } = event.target;
    this.setState({
      touch: {
        ...this.state.touch,
        [name]: true
      }
    });
  }

  hasErrors = () => {
    const { contact } = this.state;
    return Object.keys(contact)
      .some(name => {
        let value = contact[name];
        return validations[name] && validations[name](value)
      })
  }

  render() {
    const { contact, errors, touch } = this.state;
    return (
      <div className="row mx-auto">
        <div className="col-xs-12 col-sm-4 mx-auto">
          
          <div className="input-group mb-2">
            <div className="input-group-prepend">
              <div className="input-group-text"><i className="fa fa-user"></i></div>
            </div>
            <input type="text" name="name" className={`form-control ${touch.name && errors.name ? 'is-invalid': ''}`} placeholder="Name" 
              onChange={this.handleChange} onBlur={this.handleBlur} value={contact.name} />
            <div className="invalid-feedback">{ errors.name }</div>
          </div>

          <div className="input-group mb-2">
            <div className="input-group-prepend">
              <div className="input-group-text"><i className="fa fa-envelope"></i></div>
            </div>
            <input type="text" name="email" className={`form-control ${touch.email && errors.email ? 'is-invalid': ''}`} placeholder="Email" 
              onChange={this.handleChange} onBlur={this.handleBlur} value={contact.email} />
            <div className="invalid-feedback">{ errors.email }</div>
          </div>

          <div className="input-group mb-2">
            <div className="input-group-prepend">
              <div className="input-group-text"><i className="fa fa-phone"></i></div>
            </div>
            <input type="text" name="phoneNumber" className={`form-control ${touch.phoneNumber && errors.phoneNumber ? 'is-invalid': ''}`} placeholder="Phone number" 
              onChange={this.handleChange} onBlur={this.handleBlur} value={contact.phoneNumber} />
            <div className="invalid-feedback">{ errors.phoneNumber }</div>
          </div>

           <div className="form-actions mt-2">
             <button className="btn btn-primary btn-block" disabled={this.hasErrors()}>Create contact</button>
           </div>

        </div>
      </div>
    );
  }
}

export default ContactForm
