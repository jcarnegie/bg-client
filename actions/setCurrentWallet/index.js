import { mutations, updateTokensAndMe } from '@/shared/utils/apollo';

export default async(apollo, wallet) => {
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
    const { accessToken, refreshToken } = tokenData;

    updateTokensAndMe(apollo, accessToken, refreshToken, user);
  }

  return { data };
};