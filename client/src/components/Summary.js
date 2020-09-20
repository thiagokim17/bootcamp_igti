import React from 'react';

import { formatMoney } from '../helpers/formatHelpers';

const EARNING_COLOR = '#388E3C';
const EXPENSE_COLOR = '#d32f2f';

export default function Summary({ summary }) {
  const { countTransactions, totalEarnings, totalExpenses, balance } = summary;

  const { containerStyle, earningStyle, expenseStyle } = styles;
  const balanceStyle = balance >= 0 ? earningStyle : expenseStyle;

  return (
    <div style={containerStyle}>
      <span>
        <strong>Lançamentos: </strong>
        {countTransactions}
      </span>

      <span>
        <strong>
          Receitas:{' '}
          <span style={earningStyle}>{formatMoney(totalEarnings)}</span>
        </strong>
      </span>

      <span>
        <strong>
          Despesas:{' '}
          <span style={expenseStyle}>{formatMoney(totalExpenses)}</span>
        </strong>
      </span>

      <span>
        <strong>
          Saldo: <span style={balanceStyle}>{formatMoney(balance)}</span>
        </strong>
      </span>
    </div>
  );
}

const styles = {
  containerStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    padding: '5px',
    margin: '10px',
    border: '1px solid lightgrey',
    borderRadius: '4px',
  },

  earningStyle: {
    color: EARNING_COLOR,
  },

  expenseStyle: {
    color: EXPENSE_COLOR,
  },
};
