import { Fragment, useState } from "react";
import styles from "./App.module.css";

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
      setResults([{id: data.id, prompt, response: data.choices[0].text}, ...results])
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
      <main className={styles.main}>
        <section>
          <h1>Fun with AI</h1>
        </section>
        <form onSubmit={handleSubmit}>
          <label for="textarea">Enter prompt</label>
          <textarea id="textarea" value={prompt} onChange={handleChange} />
          <button type="submit">Submit</button>
        </form>
        <section className={styles.result}>
          <h2>Responses</h2>
          {results.map(result => 
          <div className={styles.card} key={result.id}>
            <div>
              <h4>Prompt:</h4>
              <p>{result.prompt}</p>
            </div>
            <div>
              <h4>Response:</h4>
              <p>{result.response}</p>
            </div>
          </div>)}
        </section>
      </main>
    </Fragment>
  );
}

export default App;
