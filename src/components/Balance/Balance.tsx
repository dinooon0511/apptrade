import style from './balance.module.css';
import Coin from '@/components/Coin/Coin.tsx';

interface BalanceProps {
  balance: number;
}

export default function Balance({ balance }: BalanceProps) {
  return (
    <div className={style.balanceWrapper}>
      <Coin size={65} />
      <span>{balance}</span>
      <span className={'primary-text'}>EUR</span>
    </div>
  );
}
