import { ref } from 'vue';
import { projectFirestore } from '../firebase/config';
import { collection, addDoc } from 'firebase/firestore';

const useCollection = (collectionName) => {
    const error = ref(null);
    const isPending = ref(false)

    const addDocument = async (doc) => {
        error.value = null;
        isPending.value = true
        try {
            const colRef = collection(projectFirestore, collectionName);
            const res = await addDoc(colRef, doc);
            isPending.value = false
            return res
        } catch (err) {
            console.log(err.message);
            error.value = 'could not send the message';
            isPending.value = false
        }
    };

    return { error, addDocument, isPending };
};

export default useCollection;
