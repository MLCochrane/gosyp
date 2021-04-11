import React from 'react';

const Burger = (): JSX.Element => (
  <>
    <svg
      id="burger-svg"
      className="burger__icon light"
      viewBox="0 0 24 20"
      width="24px"
      height="20px"
    >
      <rect className="burger__element burger__element--top" y="2" width="24" height="2" />
      <rect className="burger__element burger__element--middle" y="10" width="24" height="2" />
      <rect className="burger__element burger__element--bottom" y="18" width="24" height="2" />
    </svg>
  </>
);
export default Burger;
