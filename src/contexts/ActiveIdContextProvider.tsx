import { createContext } from "react";
import { useActiveId } from "../lib/hooks";

type ActiveIdContextT = {
  activeId: number | null;
};

export const ActiveIdContext = createContext<ActiveIdContextT | null>(null);

export default function ActiveIdContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const activeId = useActiveId();

  return (
    <ActiveIdContext.Provider
      value={{
        activeId,
      }}
    >
      {children}
    </ActiveIdContext.Provider>
  );
}
