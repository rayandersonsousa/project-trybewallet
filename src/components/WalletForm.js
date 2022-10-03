import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import { fetchCurrencies } from '../redux/actions';

class WalletForm extends Component {
  state = {
    valor: '',
    description: '',
    currency: '',
    method: '',
    tag: '',
  };

  async componentDidMount() {
    const { currencies } = this.props;
    currencies();
  }

  handleChange = (target) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { valor, description, currency, method, tag } = this.state;
    const { currenciesOptions } = this.props;

    return (
      <form>
        <label htmlFor="value">
          <input
            data-testid="value-input"
            id="value"
            value={ valor }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description">
          <input
            data-testid="description-input"
            id="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <select
          name="currency"
          data-testid="currency-input"
          value={ currency }
          onChange={ this.handleChange }
        >
          {currenciesOptions.map((moeda) => (
            <option
              key={ moeda }
            >
              { moeda }
            </option>
          ))}
        </select>
        <select
          name="payment"
          data-testid="method-input"
          value={ method }
          onChange={ this.handleChange }
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        <select
          name="tag"
          data-testid="tag-input"
          value={ tag }
          onChange={ this.handleChange }
        >
          <option value="alimentacao">Alimentação</option>
          <option value="lazer">Lazer</option>
          <option value="trabalho">Trabalho</option>
          <option value="transporte">Transporte</option>
          <option value="saude">Saúde</option>
        </select>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currenciesOptions: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  currencies: () => dispatch(fetchCurrencies()),
});

WalletForm.propTypes = {
  currencies: PropTypes.func,
  currenciesOptions: PropTypes.arrayOf,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
