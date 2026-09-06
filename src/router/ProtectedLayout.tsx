const providers: React.ComponentType<{ children: React.ReactNode }>[] = [];

export const AppProviders = ({ children }: { children: React.ReactNode }) =>
   providers.reduceRight(
      (acc, Provider) => <Provider>{acc}</Provider>,
      children
   );