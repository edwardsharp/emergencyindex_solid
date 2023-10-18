import {
  createContext,
  createSignal,
  useContext,
  ParentComponent,
} from 'solid-js';

function useProviderValue() {
  const [isDark, setIsDark] = createSignal(false);
  return { isDark, setIsDark };
}

export type ContextType = ReturnType<typeof useProviderValue>;

const DarkContext = createContext<ContextType | undefined>(undefined);

export const DarkProvider: ParentComponent = (props) => {
  const value = useProviderValue();
  return (
    <DarkContext.Provider value={value}>{props.children}</DarkContext.Provider>
  );
};

// bit.ly/SafeContext
export function useDark() {
  const context = useContext(DarkContext);
  if (context === undefined) {
    throw new Error(`useDark must be used within a DarkProvider`);
  }
  return context;
}

export function useIsDark() {
  return useDark().isDark;
}

export function useSetDark() {
  return useDark().setIsDark;
}
