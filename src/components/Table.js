import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeExpense } from '../redux/actions';

class Table extends Component {
  handleRemove = (id) => {
    const { expenses, dispatch } = this.props;
    const sieved = expenses.filter((expense) => expense.id !== id);
    dispatch(removeExpense(sieved));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <h1>Tabela de Gastos</h1>
        <table>
          <thead>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </thead>
          <tbody data-testid="table-body">
            {expenses.map((expense) => {
              const { currency, id, tag, value,
                method, description, exchangeRates } = expense;
              const exchanged = Number(exchangeRates[currency].ask);
              const moneyEx = exchanged * value;
              const coin = (exchangeRates[currency].name);
              return (
                <tr key={ id }>
                  <td>{ description }</td>
                  <td>{ tag }</td>
                  <td>{ method }</td>
                  <td>{ Number(value).toFixed(2) }</td>
                  <td>{ coin }</td>
                  <td>{ exchanged.toFixed(2) }</td>
                  <td>{ moneyEx }</td>
                  <td>Real</td>
                  <td>
                    <button
                      type="button"
                      onClick={ () => this.handleRemove(id) }
                      data-testid="delete-btn"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.array,
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
