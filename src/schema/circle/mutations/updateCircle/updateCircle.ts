import updateDocumentById from '../../../../services/firebase/firestore/mutations/updateDocumentById';

export default async function updateCircle(
  circle: Circle,
  merge: boolean,
  context: Context,
) {
  if (!circle.owner) {
    circle.owner = context.selectedProfileId;
  }

  circle.creator = context.selectedProfileId;

  return updateDocumentById(circle, context, merge);
}
