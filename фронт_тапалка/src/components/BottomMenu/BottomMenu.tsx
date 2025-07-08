import style from './bottomMenu.module.css';
import { useLocation } from 'react-router-dom';
import { Link } from '@/components/Link/Link.tsx';
import { JSX } from 'react';
import ChartIcon from '@/icons/chart-icon.tsx';
import ProfileIcon from '@/icons/profile-icon.tsx';
import HomeIcon from '@/icons/home-icon.tsx';
import Orb from '@/components/Orb/Orb.tsx';

interface BottomMenuButtonProps {
  to: string;
  icon: JSX.Element;
  color?: string;
}

function BottomMenuButton({ to, icon }: BottomMenuButtonProps) {
  return (
    <Link to={'/' + to}>
      <div className={style.bottomMenuButtonWrapper}>
        {icon}
        <span>{to}</span>
      </div>
    </Link>
  );
}

export default function BottomMenu() {
  const path = useLocation().pathname;

  return (
    <div className={style.bottomMenuWrapper}>
      <BottomMenuButton
        to={'Vorteile'}
        icon={<ChartIcon color={path === '/Vorteile' ? '#C43800' : undefined} />}
      />
      <Link to={'/home'} style={{ position: 'relative' }}>
        <Orb className={style.homeButtonWrapper}>
          <HomeIcon />
        </Orb>
      </Link>
      <BottomMenuButton
        to={'profile'}
        icon={<ProfileIcon color={path === '/profile' ? '#C43800' : undefined} />}
      />
    </div>
  );
}
