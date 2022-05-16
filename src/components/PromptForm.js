import React, { useState } from "react";
import styles from "./PromptForm.module.css";

const isEmpty = (value) => value.trim().length === 0;

const PromptForm = React.memo(props => {
  const [prompt, setPrompt] = useState("");
  const [engine, setEngine] = useState("");
  const [promptError, setPromptError] = useState(false);
  const [engineError, setEngineError] = useState(false);

  const handleTextChange = (event) => {
    setPrompt(event.target.value);
  }

  const handleEngineChange = (event) => {
    setEngine(event.target.value);
  }

  const engines = [
    {name: "davinci", version: "text-davinci-002"},
    {name: "curie", version: "text-curie-001"},
    {name: "babbage", version: "text-babbage-001"},
    {name: "ada", version: "text-ada-001"},
  ];

  const validateForm = () => {
    setPromptError(isEmpty(prompt));
    setEngineError(isEmpty(engine));

    return !isEmpty(prompt) && !isEmpty(engine);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // validate input
    const isValid = validateForm();
    if (!isValid) {
        return;
    }
    
    props.onSubmitPrompt({prompt, engine})
  }

  return (
    <section className={styles.container}>
    <form onSubmit={handleSubmit}>
      <label htmlFor="textarea">Enter prompt</label>
      <textarea id="textarea" value={prompt} onChange={handleTextChange} />
      {promptError && <p className={styles.error}>Please enter a prompt</p>}
      <label htmlFor="select">Choose AI engine </label>
      <select id="select" onChange={handleEngineChange}>
        <option value="">--Please choose an engine--</option>
        {engines.map(engine => <option key={engine.name} value={engine.value}>{engine.name}</option>)}
      </select>
      {engineError && <p className={styles.error}>Please select an AI engine</p>}
      <button type="submit">Submit</button>
    </form>
    </section>
    )
});

export default PromptForm;