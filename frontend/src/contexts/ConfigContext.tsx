import { createContext, useMemo, ReactNode } from 'react';

// project imports
import config, { AppConfig } from 'config';
import { useLocalStorage } from 'hooks/useLocalStorage';

// ==============================|| CONFIG CONTEXT TYPE ||============================== //

interface ConfigContextType {
    state: AppConfig;
    setState: React.Dispatch<React.SetStateAction<AppConfig>>;
    setField: <K extends keyof AppConfig>(key: K, value: AppConfig[K]) => void;
    resetState: () => void;
}

// ==============================|| CONFIG CONTEXT ||============================== //

export const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

// ==============================|| CONFIG PROVIDER ||============================== //

interface ConfigProviderProps {
    children: ReactNode;
}

export function ConfigProvider({ children }: ConfigProviderProps) {
    const { state, setState, setField, resetState } = useLocalStorage<AppConfig>('berry-config-vite-ts', config);

    const memoizedValue = useMemo<ConfigContextType>(
        () => ({ state, setState, setField, resetState }),
        [state, setField, setState, resetState]
    );

    return <ConfigContext.Provider value={memoizedValue}>{children}</ConfigContext.Provider>;
}
