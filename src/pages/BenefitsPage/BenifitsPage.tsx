import Balance from '@/components/Balance/Balance.tsx';
import BottomMenu from '@/components/BottomMenu/BottomMenu.tsx';

import styles from './benifitsPage.module.css';
import LightningIcon from '@/icons/lightning-icon.tsx';
import { useAppStore } from '@/store/appStore.ts';
import Orb from '@/components/Orb/Orb.tsx';
import ArrowIcon from '@/icons/arrow-icon.tsx';
import Modal from '@/components/Modal/Modal.tsx';
import { useCallback, useRef } from 'react';
import { initData, useSignal } from '@telegram-apps/sdk-react';

export default function BenefitsPage() {
  const user = useSignal(initData.user);
  const money = useAppStore((s) => s.money);
  const dialogRef = useRef<HTMLDialogElement>(null);

  if (user === undefined) {
    throw new Error('Invalid user');
  }

  const handleModalOpen = useCallback(() => {
    dialogRef.current!.showModal();
  }, []);

  const handleModalClose = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      dialogRef.current?.close();
    }
  }, []);

  return (
    <>
      <Balance balance={money} />
      <div className={styles.cardWrapper}>
        <Orb className={styles.orb}>
          <LightningIcon color={'#fff'} />
        </Orb>
        <h3>Doppelte Energie</h3>
        <span className={'primary-text'} style={{ fontSize: 20 }}>
          30 - 50 Energie
        </span>
        <div className={styles.cardDescription}>
          Verdoppeln Sie Ihre Energie, indem Sie Channel abonnieren, um mehr Geld zu verdienen!
        </div>
        <div onClick={handleModalOpen} style={{ position: 'absolute', bottom: '5%', right: '5%' }}>
          <ArrowIcon />
        </div>
      </div>
      <Modal ref={dialogRef} handleModalClose={handleModalClose} />
      <BottomMenu />
    </>
  );
}
