import Cookies from 'js-cookie';
import * as bgLocalStorage from '@/client/utils/localStorage';
import { mutations, queries } from '@/shared/utils/apollo';

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

    // store tokens in localStorage and accessToken in cookie
    bgLocalStorage.setItem('accessToken', accessToken);
    bgLocalStorage.setItem('refreshToken', refreshToken);
    Cookies.set('accessToken', accessToken);

    // update me query in apollo cache
    await apollo.writeQuery({
      query: queries.me,
      data: { me: { ...user } },
    });
  }

  return { data, errors };
};
