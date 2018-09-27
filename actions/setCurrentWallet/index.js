import { mutations, updateTokensAndMe } from '@/shared/utils/apollo';

export default async({ apollo, wallet, resetStore = true }) => {
  const { data } = await apollo.mutate({
    errorPolicy: 'all',
    mutation: mutations.setCurrentWallet,
    variables: {
      currentWallet: wallet,
    },
  });
  const { setCurrentWallet } = data;
  if (setCurrentWallet) {
    const { user, tokenData } = setCurrentWallet;
    updateTokensAndMe(apollo, tokenData, user, resetStore);
  }

  return { data };
};
