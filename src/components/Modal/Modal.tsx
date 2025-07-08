import { forwardRef, useCallback } from 'react';
import style from './modal.module.css';
import { ToastContainer } from 'react-toastify';
import AttentionIcon from '@/icons/attention-icon.tsx';
import clsx from 'clsx';
import { initData, openTelegramLink, useSignal } from '@telegram-apps/sdk-react';
import { checkSubscription } from '@/api/checkSubscription.ts';
import { useAppStore } from '@/store/appStore.ts';

interface ModalProps {
  handleModalClose: (e: React.MouseEvent) => void;
}

const Modal = forwardRef<HTMLDialogElement, ModalProps>(({ handleModalClose }, dialogRef) => {
  const user = useSignal(initData.user);
  const setEnergi = useAppStore((s) => s.setEnergi);

  if (user === undefined) {
    throw new Error('User is invalid');
  }

  const handleSubscribeButtonOpen = useCallback(async () => {
    openTelegramLink(import.meta.env.VITE_TG_CHANEL_URL);
    const { energi } = await checkSubscription(user.id);

    if (energi) {
      setEnergi(energi);
    }
  }, [user.id, setEnergi]);

  return (
    <dialog ref={dialogRef} className={style.modalWrapper} onClick={handleModalClose}>
      <ToastContainer
        position={'top-center'}
        autoClose={750}
        theme={'dark'}
        style={{ position: 'absolute', top: 0 }}
      />
      <div className={style.modalOrb}>
        <AttentionIcon />
      </div>
      <h3 className={style.modalHeader}>
        Schwab <span className={'primary-text'}>Handel</span>
      </h3>
      <span className={clsx(style.modelSubHeader, 'primary-text')}>
        Holen Sie sich von 30 bis 50
      </span>
      <hr />
      <div className={style.descriptionWrapper}>
        <span className={style.description}>
          Abonniere den Kanal und erhalte mehr Energie und verdiene komm schon!
        </span>
        <svg
          width="17"
          height="27"
          viewBox="0 0 17 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M15.7345 11.9321L4.69286 0.890419C4.48696 0.684518 4.24252 0.521188 3.9735 0.409755C3.70447 0.298321 3.41614 0.240967 3.12495 0.240967C2.53686 0.240967 1.97287 0.474582 1.55703 0.890419C1.35113 1.09632 1.1878 1.34076 1.07636 1.60979C0.964931 1.87881 0.907578 2.16715 0.907578 2.45834C0.907578 3.04642 1.14119 3.61042 1.55703 4.02625L11.0529 13.5L1.55703 22.9738C1.35005 23.179 1.18576 23.4233 1.07365 23.6924C0.961531 23.9615 0.903809 24.2501 0.903809 24.5417C0.903809 24.8332 0.961531 25.1218 1.07365 25.3909C1.18576 25.66 1.35005 25.9043 1.55703 26.1096C1.76232 26.3166 2.00657 26.4809 2.27567 26.593C2.54478 26.7051 2.83342 26.7628 3.12495 26.7628C3.41647 26.7628 3.70511 26.7051 3.97422 26.593C4.24333 26.4809 4.48757 26.3166 4.69286 26.1096L15.7345 15.0679C15.9415 14.8626 16.1058 14.6184 16.2179 14.3493C16.33 14.0802 16.3878 13.7915 16.3878 13.5C16.3878 13.2085 16.33 12.9198 16.2179 12.6507C16.1058 12.3816 15.9415 12.1374 15.7345 11.9321Z"
            fill="white"
          />
        </svg>
        <img
          src={'/chanelPic.png'}
          alt={'channel pic'}
          style={{ width: 92, height: 92, borderRadius: 20 }}
        />
      </div>
      <button onClick={handleSubscribeButtonOpen} className={style.modalButton}>
        Abonnieren
      </button>
    </dialog>
  );
});

export default Modal;
