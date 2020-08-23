import React, { ReactNode } from 'react';

import './button.scss';

type ButtonProps = {
  className: string,
  disabled: boolean,
  type: 'button' | 'reset' | 'submit',
  children: ReactNode,
  handleClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void | null,
}

const Button = (props : ButtonProps) => {
  const {
    className, disabled, type, children, handleClick,
  } = props;

  return (
    <button
      type={ type }
      className={ `button${className ? ` ${className}` : ''}` }
      disabled={ disabled }
      onClick={ handleClick }
    >
      { children }
    </button>
  );
};
export default Button;
Button.defaultProps = {
  handleClick: null,
};
