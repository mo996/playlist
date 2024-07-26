import { ref, watchEffect } from 'vue';
import { doc, onSnapshot } from 'firebase/firestore';
import { projectFirestore } from '../firebase/config';

const getDocument = (collectionName, id) => {
  const document = ref(null);
  const error = ref(null);

  // register the firestore document reference
  const documentRef = doc(projectFirestore, collectionName, id);

  const unsub = onSnapshot(documentRef, (doc) => {
    console.log(doc);
    if (doc.exists()) {
      // update values
      document.value = { ...doc.data(), id: doc.id };
      error.value = null;
    } else {
      error.value = 'document does not exist';
    }
  }, (err) => {
    console.log(err.message);
    document.value = null;
    error.value = 'could not fetch the data';
  });

  watchEffect((onInvalidate) => {
    // unsubscribe from snapshot listener on component unmount
    onInvalidate(() => unsub());
  });

  return { error, document };
}

export default getDocument;
