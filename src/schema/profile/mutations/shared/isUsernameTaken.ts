import firestore from '../../../../services/firebase/firestore';

export default async function isUsernameTaken(username: string) {
  return firestore
    .collection('profiles')
    .where('username', '==', username)
    .limit(1)
    .get()
    .then((response: any) => {
      return response.docs.length ? true : false;
    });
}
