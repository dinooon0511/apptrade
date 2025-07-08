import type { ComponentType, JSX } from 'react';
import HomePage from '@/pages/HomePage/HomePage.tsx';
import ProfilePage from '@/pages/ProfilePage/ProfilePage.tsx';
import BenefitsPage from '@/pages/BenefitsPage/BenifitsPage.tsx';
import HelloPage from '@/pages/HelloPage/HelloPage.tsx';

interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
}

export const routes: Route[] = [
  {
    path: '/home',
    Component: HomePage,
  },
  {
    path: '/profile',
    Component: ProfilePage,
  },
  {
    path: '/Vorteile',
    Component: BenefitsPage,
  },
  {
    path: '/',
    Component: HelloPage,
  },
];
