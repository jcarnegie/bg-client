import { mutations, updateTokensAndMe } from '@/shared/utils/apollo';

export default async({ apollo, web3Wallet, signature }) => {
  const { data, errors } = await apollo.mutate({
    errorPolicy: 'all',
    mutation: mutations.login,
    variables: {
      wallet: web3Wallet,
      signature,
    },
  });
  const { login } = data;
  if (login) {
    const { user, tokenData } = login;
    updateTokensAndMe(apollo, tokenData, user);
  }
  return { data, errors };
};
