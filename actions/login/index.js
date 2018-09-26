import { mutations, updateTokensAndMe } from '@/shared/utils/apollo';

export default async(apollo, wallet, signature) => {
  const { data, errors } = await apollo.mutate({
    errorPolicy: 'all',
    mutation: mutations.login,
    variables: {
      wallet,
      signature,
    },
  });
  const { login } = data;
  if (login) {
    const { user, tokenData } = login;
    const { accessToken, refreshToken } = tokenData;
    updateTokensAndMe(apollo, accessToken, refreshToken, user);
  }
  return { data, errors };
};
