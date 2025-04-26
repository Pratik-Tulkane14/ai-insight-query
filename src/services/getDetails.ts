import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
interface BodyData {
    prompt:string|File
}
interface GeminiApiResponse {
  success: boolean;
  response: string;
}
const getDetails = async (bodyData: BodyData) => {
  try {
    const result = await axios.post<GeminiApiResponse>(
      `${BASE_URL}/query`,
      bodyData
    );
    return result;
  } catch (e) {
    return e;
  }
};
export default getDetails;
