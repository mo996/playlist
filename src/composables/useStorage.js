import { ref } from "vue";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import getUser from "./getUser";

const { user } = getUser();
const projectStorage = getStorage();  // Initialize the storage

const useStorage = () => {
  const error = ref(null);
  const url = ref(null);
  const filePath = ref(null);

  const uploadImage = async (file) => {
    filePath.value = `covers/${user.value.uid}/${file.name}`;
    const fileRef = storageRef(projectStorage, filePath.value); // Create a reference to the file

    try {
      const res = await uploadBytes(fileRef, file); // Upload the file
      url.value = await getDownloadURL(res.ref); // Get the download URL
    } catch (err) {
      console.log(err.message);
      error.value = err;
    }
  };

  const deleteImage = async (path) => {
    const fileRef = storageRef(projectStorage, path); // Create a reference to the file

    try {
      await deleteObject(fileRef); // Delete the file
    } catch (err) {
      console.log(err.message);
      error.value = err;
    }
  }

  return { uploadImage, url, filePath, error, deleteImage };
};

export default useStorage;
