import axios from "axios";
const SECRET_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const generateContentFromGemini = async (
  prompt: string | File
): Promise<string> => {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=${SECRET_KEY}`;

  try {
    if (prompt instanceof File) {
      const formData = new FormData();
      formData.append("file", prompt);

      const response = await axios.post(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data", 
        },
      });
      return (
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response"
      );
    }
    else {
      const response = await axios.post(
        endpoint,
        {
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json", 
          },
        }
      );
      return (
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response"
      );
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating content";
  }
};

export default generateContentFromGemini;
