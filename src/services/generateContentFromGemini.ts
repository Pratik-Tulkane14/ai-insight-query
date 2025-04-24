const SECRET_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const generateContentFromGemini = async (prompt: string) => {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${SECRET_KEY}`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    });

    const data = await response.json();
    const result = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    console.log(result, "result");
    // setInputMessages((prev) => [
    //   ...prev,
    //   { gemini: data?.candidates?.[0]?.content?.parts?.[0]?.text, client: "" },
    // ]);

    return result || "No response from Gemini.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error occurred while generating content.";
  }
};
export default generateContentFromGemini;
