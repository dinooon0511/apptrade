import { useEffect, useMemo, useState } from 'react';
import { Navigate, Route, Routes, HashRouter } from 'react-router-dom';
import { initData, retrieveLaunchParams, useSignal } from '@telegram-apps/sdk-react';
import { AppRoot, Spinner } from '@telegram-apps/telegram-ui';

import { routes } from '@/navigation/routes.tsx';
import { getUserData } from '@/api/getUserData.ts';
import { useAppStore } from '@/store/appStore.ts';

export function App() {
  const lp = useMemo(() => retrieveLaunchParams(), []);
  const [isUserDataLoading, setIsUserDataLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const user = useSignal(initData.user);
  const { init, energi, money } = useAppStore();

  if (user === undefined) {
    throw new Error('Invalid telegram user');
  }

  async function loadUserData() {
    try {
      const userData = await getUserData(user!.id);
      init(userData);
    } catch {
      setErrorMessage('Unable to load user data try agan later');
    } finally {
      setIsUserDataLoading(false);
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      loadUserData().then();
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const saveData = async () => {
      try {
        const payload = JSON.stringify({ user_id: user.id, energi, money });
        await fetch(`${import.meta.env.VITE_API_BASE_URL}/save`, {
          method: 'POST',
          body: payload,
          headers: {
            'Content-Type': 'application/json',
          },
          keepalive: true,
        });
      } catch (error) {
        console.error('Save error:', error);
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        saveData();
      }
    };

    window.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [user?.id, energi, money]);

  return (
    <AppRoot
      className={'app-container'}
      appearance={'dark'}
      platform={['macos', 'ios'].includes(lp.tgWebAppPlatform) ? 'ios' : 'base'}>
      <HashRouter>
        {isUserDataLoading ? (
          <Spinner size={'l'} />
        ) : errorMessage !== null ? (
          <span style={{ color: '#f10909', fontSize: 24 }}>{errorMessage}</span>
        ) : (
          <Routes>
            {routes.map((route) => (
              <Route key={route.path} {...route} />
            ))}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </HashRouter>
    </AppRoot>
  );
}
