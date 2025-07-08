import style from './helloPage.module.css';
import { PropsWithChildren, useCallback } from 'react';
import Orb from '@/components/Orb/Orb.tsx';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

interface HeroItemProps {
  className: string;
  icon: JSX.Element;
  dir?: 'left' | 'right';
}

function HeroItem({ className, children, icon, dir = 'left' }: PropsWithChildren<HeroItemProps>) {
  return (
    <div
      className={clsx(
        style.heroItemWrapper,
        className,
        dir === 'right' ? style.heroItemWrapperRight : null,
      )}>
      {icon}
      <div className={style.contentWrapper}>{children}</div>
    </div>
  );
}

export default function HelloPage() {
  const nav = useNavigate();

  const start = useCallback(() => {
    localStorage.setItem('visited', 'true');
    nav('/home');
  }, [nav]);

  return (
    <>
      <h1>
        Willkommen bei <span className="txt-color">Geld</span>
      </h1>
      <hr />
      <span className={style.subHeader}>
        Klicke auf den Bildschirm und verdiene echtes Geld. Zahlen Sie Pfund direkt auf Ihr
        Bankkonto mit einer Bankkarte!
      </span>
      <div className={style.hero}>
        <HeroItem className={style.subHeader} icon={<Orb className={style.heroItemOrb}>1</Orb>}>
          <h3 className={style.heroItemHead1}>
            Tippe, um mehr <span className="txt-color">Münzen zu bekommen</span>
          </h3>
          <hr />
          <span className={style.heroItemDescription}>
            Tippe auf den Bildschirm, um so viele Münzen wie möglich zu sammeln! Je mehr, je mehr
            Sie tippen, desto mehr verdienen Sie
          </span>
        </HeroItem>
        <HeroItem
          dir={'right'}
          className={style.subHeader}
          icon={<Orb className={style.heroItemOrb}>2</Orb>}>
          <h3 className={style.heroItemHead2}>
            Spiele mit <span className="txt-color">Freunden</span>
          </h3>
          <hr />
          <span className={style.heroItemDescription}>
            Spiele mit deinen Freunden und verdiene mehr Geld!
          </span>
        </HeroItem>
        <HeroItem className={style.subHeader} icon={<Orb className={style.heroItemOrb}>3</Orb>}>
          <h3 className={style.heroItemHead}>
            <span className="txt-color">Vorteil</span>
          </h3>
          <hr />
          <span className={style.heroItemDescription}>
            Erhöhen Sie die Bügelgeschwindigkeit! Verdiene mehr Geld mit Verbesserungen.
          </span>
        </HeroItem>
      </div>

      <button onClick={start} className={style.btn}>
        Fangen Sie An Zu Verdienen
      </button>
    </>
  );
}
