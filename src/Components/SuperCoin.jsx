import React from 'react';

const SuperCoin = ({superCoins}) =>{
    return(
        <div className="super-coins" style={{textAlign:'center'}}>
            <h2 className="super-coins-title">Super Coins</h2>
            <p className="super-coins-info">You will earn {superCoins} super coins with this purchase.</p>
        </div>
    );
};

export default SuperCoin;