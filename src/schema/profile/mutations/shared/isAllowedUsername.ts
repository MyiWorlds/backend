export const isAllowedUsername = (username: string) => {
  const bannedUsernames = [
    '',
    'test',
    'app',
    'admin',
    'user',
    'myiworlds',
    'account',
    'accounts',
    'admins',
  ];
  const notBannedUsername = !bannedUsernames.includes(username);
  const bannedSymbols = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

  const isLongEnough = username.length > 3;
  const doesNotContainBannedCharacters =
    !username.includes('/') || !username.includes('\\');
  const doesNotContainBannedSymbols = !bannedSymbols.test(username);

  return (
    notBannedUsername &&
    isLongEnough &&
    doesNotContainBannedCharacters &&
    doesNotContainBannedSymbols
  );
};
