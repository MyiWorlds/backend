import firebase from '..';

const getViewerId = async (token: string) => {
  if (token && token !== 'null') {
    const viewerId = await firebase
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
    return viewerId;
  } else {
    return null;
  }
};

export default getViewerId;
