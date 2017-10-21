import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signup extends Component {
  renderField(field) {
    const { meta: { touched, error, warning } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label>{field.lable}</label>
        <input
          className="form-control"
          type={field.type}
          {...field.input}
        />
        <div className="text-help">
        {touched ? error : ''}
        {/* {touched ? warning : ''} */}
        </div>
      </div>
    );
  }

  handleFormSubmit(formProps) {
    this.props.signupUser(formProps);
  }

  renderAlert() {
    if(this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit, fields: { email, password, passwordConfirm }} = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field lable="Email" name="email" type="text" component={this.renderField}/>
        <Field lable="Password" name="password" type="password" component={this.renderField}/>
        <Field lable="Confirm Password" name="passwordConfirm" type="password" component={this.renderField}/>
        {this.renderAlert()}
        <button type="submit" className="btn btn-primary">Sign Up!</button>
      </form>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.email) {
      errors.email = 'Please enter an email';
  }

  if (!formProps.password) {
    errors.password = 'Please enter password';
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter confirm password';
  }

  if (formProps.password !== formProps.passwordConfirm) {
      errors.password = 'Passwords must match';
  }
  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  validate,
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm']
})(
  connect(mapStateToProps, actions)(Signup)
);

// return (
//   <form>
//     <fieldset className="form-group">
//       <label>Email:</label>
//       <Field {...email} name="email" component="input" type="email" className="form-control" />
//     </fieldset>
//     <fieldset className="form-group">
//       <label>Password:</label>
//       <Field {...password} name="password" component="input" type="password" className="form-control" />
//       { password.touched && password.error && <div className="error">{password.error}</div> }
//     </fieldset>
//     <fieldset className="form-group">
//       <label>Confirm Password:</label>
//       <Field {...passwordConfirm} name="passwordConfirm" component="input" type="password" className="form-control" />
//     </fieldset>
//     <button type="submit" className="btn btn-primary">Sign up!</button>
//   </form>
// );
