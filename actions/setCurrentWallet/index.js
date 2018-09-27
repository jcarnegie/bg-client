import { mutations, updateTokensAndMe } from '@/shared/utils/apollo';

export default async({ apollo, web3Wallet, resetStore = true }) => {
  const { data } = await apollo.mutate({
    errorPolicy: 'all',
    mutation: mutations.setCurrentWallet,
    variables: {
      currentWallet: web3Wallet,
    },
  });
  const { setCurrentWallet } = data;
  if (setCurrentWallet) {
    const { user, tokenData } = setCurrentWallet;
    updateTokensAndMe(apollo, tokenData, user, resetStore);
  }

  return { data };
};
