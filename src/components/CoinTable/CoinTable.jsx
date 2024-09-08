import React from 'react';
import './CoinTable.css'; // Optional CSS for styling

const CoinTable = ({ coin, currency }) => {
  const currencySymbol = currency === 'inr' ? '₹' : '$';

  return (
    <table className="coin-table">
      <thead>
        <tr>
          <th>Attribute</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Name</td>
          <td>{coin.name}</td>
        </tr>
        <tr>
          <td>Symbol</td>
          <td>{coin.symbol.toUpperCase()}</td>
        </tr>
        <tr>
          <td>Current Price</td>
          <td>{currencySymbol}{coin.market_data?.current_price[currency]}</td>
        </tr>
        <tr>
          <td>Market Cap</td>
          <td>{currencySymbol}{coin.market_data?.market_cap[currency]}</td>
        </tr>
        <tr>
          <td>24h High</td>
          <td>{currencySymbol}{coin.market_data?.high_24h[currency]}</td>
        </tr>
        <tr>
          <td>24h Low</td>
          <td>{currencySymbol}{coin.market_data?.low_24h[currency]}</td>
        </tr>
        <tr>
          <td>Market Cap Rank</td>
          <td>#{coin.market_cap_rank}</td>
        </tr>
        <tr>
          <td>Price Change (24h)</td>
          <td>{coin.market_data?.price_change_percentage_24h}%</td>
        </tr>
      </tbody>
    </table>
  );
};

export default CoinTable;
