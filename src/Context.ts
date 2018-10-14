// import * as DataLoader from 'dataloader';
// import { getDocumentsByIds } from './services/firebase/firestore/queries';
// import { request } from 'express';

// class Context {
//   request: request;
//   user: any;

//   const headers = {
//     userId: await getUserId(req.headers.token),
//     queriedUserId: req.headers['user-id'],
//     selectedProfileId: req.headers['selected-profile-id'],
//     validated: false,
//   };

//   if (headers.userId && headers.queriedUserId === 'null') {
//     const user = await firestore
//       .doc(`users/${headers.userId}`)
//       .get()
//       .then((result: any) => result.data());

//     headers.queriedUserId = user.id;
//     headers.selectedProfileId = user.profiles[0].id;
//   }

//   if (headers.userId === headers.queriedUserId) {
//     headers.validated = true;
//   } else {
//     headers.userId = null;
//     headers.queriedUserId = null;
//     headers.selectedProfileId = null;
//   }

//   this.user = headers;

//   // constructor(request: Request) {
//   //   this.request = request;
//   // }

//   // userById = new DataLoader((keys: string[]) =>
//   //   getDocumentsByIds(
//   //     'users',
//   //     keys,
//   //     this.user && this.user.uid ? this.user.uid : null,
//   //   ).then((response: any) => response.entities),
//   // );

//   // circleById = new DataLoader((keys: string[]) =>
//   //   getDocumentsByIds(
//   //     'circles',
//   //     keys,
//   //     this.user && this.user.uid ? this.user.uid : null,
//   //   ).then((response: any) => response.entities),
//   // );

//   //     get user(): any {
//   //       const headers = {
//   //         userId: await getUserId(req.headers.token),
//   //         queriedUserId: req.headers['user-id'],
//   //         selectedProfileId: req.headers['selected-profile-id'],
//   //         validated: false,
//   //       };

//   //       if (headers.userId && headers.queriedUserId === 'null') {
//   //         const user = await firestore
//   //           .doc(`users/${headers.userId}`)
//   //           .get()
//   //           .then((result: any) => result.data());

//   //         headers.queriedUserId = user.id;
//   //         headers.selectedProfileId = user.profiles[0].id;
//   //       }

//   //       if (headers.userId === headers.queriedUserId) {
//   //         headers.validated = true;
//   //       } else {
//   //         headers.userId = null;
//   //         headers.queriedUserId = null;
//   //         headers.selectedProfileId = null;
//   //       }

//   //       return headers;
//   //     }

//   // get user(): any {
//   //   if (!this.request.user) {
//   //     const noUser = {
//   //       uid: null
//   //     }
//   //     return noUser;
//   //   }
//   //   return this.request.user;
//   // }
//   /*
//    * Data loaders to be used with GraphQL resolve() functions.
//    * For more information visit https://github.com/facebook/dataloader
//    */
// }

// export default Context;
