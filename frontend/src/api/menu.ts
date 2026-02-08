import useSWR, { mutate } from 'swr';
import { useMemo } from 'react';

// ==============================|| MENU STATE TYPE ||============================== //

interface MenuMasterState {
  isDashboardDrawerOpened: boolean;
}

interface MenuMasterReturn {
  menuMaster: MenuMasterState | undefined;
  menuMasterLoading: boolean;
}

const initialState: MenuMasterState = {
  isDashboardDrawerOpened: false
};

const endpoints = {
  key: 'api/menu',
  master: 'master'
};

export function useGetMenuMaster(): MenuMasterReturn {
  const { data, isLoading } = useSWR<MenuMasterState>(
    endpoints.key + endpoints.master,
    () => initialState,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  );

  const memoizedValue = useMemo<MenuMasterReturn>(
    () => ({
      menuMaster: data,
      menuMasterLoading: isLoading
    }),
    [data, isLoading]
  );

  return memoizedValue;
}

export function handlerDrawerOpen(isDashboardDrawerOpened: boolean): void {
  // to update local state based on key

  mutate(
    endpoints.key + endpoints.master,
    (currentMenuMaster: MenuMasterState | undefined) => {
      return { ...currentMenuMaster, isDashboardDrawerOpened };
    },
    false
  );
}
