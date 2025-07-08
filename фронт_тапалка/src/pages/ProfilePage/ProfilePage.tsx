import style from './profilePage.module.css';
import Coin from '@/components/Coin/Coin.tsx';
import BottomMenu from '@/components/BottomMenu/BottomMenu.tsx';
import ArrowIcon from '@/icons/arrow-icon.tsx';
import { useAppStore } from '@/store/appStore.ts';
import { useCallback } from 'react';
import { toast, ToastContainer } from 'react-toastify';

export default function ProfilePage() {
  const balance = useAppStore((s) => s.money);

  const handleWithdrawalClick = useCallback(() => {
    if (balance < 1500) {
      toast.error('Requires 1500 GPB');
    } else {
      toast.error('Insufficient balance');
    }
  }, [balance]);

  return (
    <>
      <ToastContainer
        position={'top-center'}
        theme={'dark'}
        autoClose={2000}
        limit={2}
        newestOnTop={false}
      />
      <h1>Währungssaldo</h1>
      <div className={style.coinWrapper}>
        <Coin className={'page-coin'} />
      </div>
      <div className={style.infoWrapper}>
        <span>
          {balance} <span className='txt-color'>EUR</span>
        </span>
        <button onClick={handleWithdrawalClick} className={style.withdrawalButton}>
          <ArrowIcon color={'#fff'} dir={'left'} /> Rücknahme
        </button>
      </div>
      <BottomMenu />
    </>
  );
}
