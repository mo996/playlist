import { ref } from 'vue';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { projectFirestore } from '../firebase/config';

const useDocument = (collection, id) => {
  let error = ref(null);
  let isPending = ref(false);

  // Create a document reference
  let docRef = doc(projectFirestore, collection, id);

  const deleteDocument = async () => {
    isPending.value = true;
    error.value = null;

    try {
      const res = await deleteDoc(docRef);
      isPending.value = false;
      return res;
    } catch (err) {
      console.log(err.message);
      isPending.value = false;
      error.value = 'could not delete the document';
    }
  };

  const updateDocument = async (updates) => {
    isPending.value = true;
    error.value = null;

    try {
      await updateDoc(docRef, updates);
      isPending.value = false;
    } catch (err) {
      console.log(err.message);
      isPending.value = false;
      error.value = 'could not update the document';
    }
  };

  return { error, isPending, deleteDocument, updateDocument };
};

export default useDocument;
