import { mutations, updateTokensAndMe } from '@/shared/utils/apollo';

export default async(apollo, email, wallet, nickName, signature, language) => {
  const { data, errors } = await apollo.mutate({
    errorPolicy: 'all',
    mutation: mutations.register,
    variables: {
      email,
      wallet,
      nickName,
      signature,
      language,
    },
  });
  const { register } = data;
  if (register) {
    const { user, tokenData } = register;
    const { accessToken, refreshToken } = tokenData;
    updateTokensAndMe(apollo, accessToken, refreshToken, user);
  }
  return { data, errors };
};
