import type { ReactNode } from 'react';
import React from 'react';

import './button.scss';

type ButtonProps = {
  className: string,
  disabled: boolean,
  type: 'button' | 'reset' | 'submit',
  children: ReactNode,
}

const Button = (props : ButtonProps) => {
  const {
    className,
    disabled,
    type,
    children,
  } = props;

  return (
    <button
      type={ type }
      className={ `button${className ? ` ${className}` : ''}` }
      disabled={ disabled }
    >
      { children }
    </button>
  );
};
export default Button;
