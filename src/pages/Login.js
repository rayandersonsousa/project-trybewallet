import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { emailData, passwordData } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isDisable: true,
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    }, this.handleDisable);
  };

  handleClick = () => {
    const { history, dispatch } = this.props;
    const { email, password } = this.state;

    dispatch(emailData(email));
    dispatch(passwordData(password));

    history.push('/carteira');
  };

  handleDisable = () => {
    const { email, password } = this.state;
    const regex = /\S+@\S+\.\S+/;
    const passwordMin = 6;
    const emailOk = regex.test(email);
    const passwordOk = password.length >= passwordMin;

    this.setState({
      isDisable: !(emailOk && passwordOk),
    });
  };

  render() {
    const { email, password, isDisable } = this.state;
    return (
      <form>
        <input
          type="email"
          data-testid="email-input"
          name="email"
          onChange={ this.handleChange }
          value={ email }
        />
        <input
          type="password"
          data-testid="password-input"
          name="password"
          onChange={ this.handleChange }
          value={ password }
        />
        <button
          type="button"
          disabled={ isDisable }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(Login);
