import { ref } from 'vue';
import { projectAuth } from '../firebase/config';
import { signOut } from 'firebase/auth';

const error = ref(null);
const isPending = ref(false)


const logout = async () => {
  error.value = null;
  isPending.value = true

  try {
    await signOut(projectAuth);
    error.value = null;
    isPending.value = false
  } catch (err) {
    console.log(err.message);
    error.value = 'Failed to log out';
    isPending.value = false
  }
};

const useLogout = () => {
  return { error, logout, isPending };
};

export default useLogout;
