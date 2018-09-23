import firebase from '..';

const getUserId = async (token: string) => {
  if (token && token !== 'null') {
    const userId = await firebase
      .auth()
      .verifyIdToken(token)
      .then((decodedToken: any) => {
        const id = decodedToken.uid;
        return id;
      })
      .catch((error: any) => {
        console.log(error);

        return null;
      });
    return userId;
  } else {
    return null;
  }
};

export default getUserId;
