import styles from './coin.module.css';
import clsx from 'clsx';
import React, { forwardRef } from 'react';

const Coin = forwardRef<
  HTMLImageElement,
  React.HTMLAttributes<HTMLImageElement> & {
    size?: number | string;
  }
>(({ className, size, style, ...rest }, ref) => {
  return (
    <img
      ref={ref}
      className={clsx(styles.coin, className)}
      src="/coin.png"
      alt="coin"
      style={{
        width: size,
        height: size,
        ...style,
      }}
      {...rest}
    />
  );
});

export default Coin;
