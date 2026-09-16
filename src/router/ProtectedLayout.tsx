import { AppProvider } from "@/context/AppContext";
const providers: React.ComponentType<{ children: React.ReactNode }>[] = [AppProvider];

export const AppProviders = ({ children }: { children: React.ReactNode }) =>
  providers.reduceRight(
    (acc, Provider) => <Provider>{acc}</Provider>,
    children
  );