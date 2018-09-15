import firebase from '../firebase';
import getEntities from '../queries/getDocumentsByFilters';

/* Caution: Be careful when passing a Cloud Datastore cursor
to a client, such as in a web form. Although the client cannot
change the cursor value to access results outside of the original
query, it is possible for it to decode the cursor to expose
information about result entities, such as the project ID, entity
kind, key name or numeric ID, ancestor keys, and properties used
in the query's filters and sort orders. If you don't want users to
have access to that information, you can encrypt the cursor, or store
it and provide the user with an opaque key. */

export default async function deleteDocuments(keys, contextUserUid) {
  console.time('deleteDocuments time to complete');
  let response = {
    status: '',
    message: '',
    numberOfClones: 0,
    clonesDeleted: false,
    wasDeleted: false,
  };

  try {
    // TODO: Delete clones first
    keys.map(async item => {
      const clones = await getEntities(
        `${item.kind}-clones`,
        [
          {
            property: `${item.kind}Uid`,
            condition: '=',
            value: item.name, // Key passes id in name property
          },
        ],
        // Might have to make if there is more after 999999 send another query/delete request
        999999,
        null,
        contextUserUid,
      );

      if (clones.entities && clones.entities.length > 0) {
        const cloneEntitiesToDelete = [];

        clones.entities.forEach(entity =>
          cloneEntitiesToDelete.push(entity[firebase.KEY]),
        );

        await firebase.delete(cloneEntitiesToDelete).then(() => {
          response.numberOfClones += clones.entities.length;
        });
      }
    });

    firebase.delete(keys);
  } catch (error) {
    console.log(error);
    response = {
      status: 'ERROR',
      messsage:
        'Sorry, I had an error getting the Entities.  Please refresh and try again.',
      entities: null,
      cursor: null,
    };
  }
  console.time('deleteDocuments time to complete');
  return response;
}
