import { Fragment, useState } from "react";

function App() {
  const [prompt, setPrompt] = useState("");
  const [results, setResults] = useState([]);

  const handleChange = (event) => {
    setPrompt(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (prompt === "") {
      return;
    } 
     
    fetchData()
    .then(data=> {
      console.log(data);
      setResults([...results, {id: data.id, prompt, response: data.choices[0].text}])
      setPrompt("");
    })
    .catch(error => {
      console.error('Error:', error);
    });;
  }

  async function fetchData () {
    const data = {
      prompt: prompt, // "Write a poem about a dog wearing skis"
      temperature: 0.5,
      max_tokens: 64,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
     };
        
    const response = await fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_SECRET}`,
      },
      body: JSON.stringify(data),
     });

     return response.json();
  };

  return (
    <Fragment >
      <header></header>
      <main>
        <section>
          <h1>Fun with AI</h1>
          <form onSubmit={handleSubmit}>
            <label>
              Enter prompt
              <textarea rows={10} cols={50} value={prompt} onChange={handleChange} />
            </label>
            <button type="submit">Submit</button>
          </form>
        </section>
        <section>
          <h2>Responses</h2>
          {results.map(result => <div key={result.id}>
            <div><span>Prompt:</span><p>{result.prompt}</p></div>
            <div><span>Response:</span><p>{result.response}</p></div>
          </div>)}
        </section>
      </main>
    </Fragment>
  );
}

export default App;
