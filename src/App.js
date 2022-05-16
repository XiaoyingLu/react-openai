import { Fragment, useState } from "react";
import styles from "./App.module.css";

// TODO
// http loading, error 

function App() {
  const engines = [
    {name: "davinci", version: "text-davinci-002"},
    {name: "curie", version: "text-curie-001"},
    {name: "babbage", version: "text-babbage-001"},
    {name: "ada", version: "text-ada-001"},
  ];

  const [prompt, setPrompt] = useState("");
  const [engine, setEngine] = useState("")
  const [results, setResults] = useState([]);

  const handleTextChange = (event) => {
    setPrompt(event.target.value);
  }

  const handleEngineChange = (event) => {
    setEngine(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: validate prompt
    if (prompt === "" || engine === "") {
      return;
    }
    console.log(engine);
     
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

  return (
    <Fragment >
      <main className={styles.main}>
        <section>
          <h1>Fun with AI</h1>
        </section>
        <form onSubmit={handleSubmit}>
          <label htmlFor="textarea">Enter prompt</label>
          <textarea id="textarea" value={prompt} onChange={handleTextChange} />
          <label htmlFor="select">Chose engine </label>
          <select id="select" onChange={handleEngineChange}>
            <option value="">--Please choose an engine--</option>
            {engines.map(engine => <option key={engine.name} value={engine.value}>{engine.name}</option>)}
          </select>
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
