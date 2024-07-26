import { ref, watchEffect } from 'vue';
import { collection, query, orderBy, where, onSnapshot } from 'firebase/firestore';
import { projectFirestore } from '../firebase/config';

const getCollection = (collectionName, queryCondition = null) => {
  const documents = ref(null);
  const error = ref(null);

  // register the firestore collection reference
  let collectionRef = collection(projectFirestore, collectionName);
  let q = query(collectionRef, orderBy('createdAt'));

  // Apply the query condition if provided
  if (queryCondition) {
    const [field, operator, value] = queryCondition;
    q = query(collectionRef, where(field, operator, value), orderBy('createdAt'));
  }

  const unsub = onSnapshot(q, (snapshot) => {
    console.log(snapshot);
    let results = [];
    snapshot.docs.forEach(doc => {
      // must wait for the server to create the timestamp & send it back
      // we don't want to edit data until it has done this
      doc.data().createdAt && results.push({ ...doc.data(), id: doc.id });
    });

    // update values
    documents.value = results;
    error.value = null;
  }, (err) => {
    console.log(err.message);
    documents.value = null;
    error.value = 'could not fetch the data';
  });

  watchEffect((onInvalidate) => {
    // unsubscribe from snapshot listener on component unmount
    onInvalidate(() => unsub());
  });

  return { error, documents };
};

export default getCollection;
