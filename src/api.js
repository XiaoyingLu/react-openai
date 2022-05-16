export default async function fetchData ({prompt, engine}) {
  const data = {
    prompt: prompt, // "Write a poem about a dog wearing skis"
    temperature: 0.5,
    max_tokens: 64,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  };
        
  const response = await fetch(`https://api.openai.com/v1/engines/${engine}/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_OPENAI_SECRET}`,
    },
    body: JSON.stringify(data),
  });

  return response.json();
};