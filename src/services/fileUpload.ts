import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const fileUpload = async () => {
  try {
    const res = await axios.post(`${BASE_URL}.file/upload`);
    return res;
  } catch (e) {
    return e;
  }
};
export default fileUpload;
