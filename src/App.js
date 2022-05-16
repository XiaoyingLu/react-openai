import { Fragment, useState } from "react";
import styles from "./App.module.css";
import PromptForm from "./components/PromptForm";
import ResponseList from "./components/ResponseList";
import fetchData from "./api";

function App() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const onSubmitPrompt = ({prompt, engine}) => {
    setIsLoading(true);
     
    fetchData({prompt, engine})
    .then(data=> {
      setIsLoading(false);
      setResults([{id: data.id, prompt, response: data.choices[0].text}, ...results])
    })
    .catch(error => {
      setIsLoading(false);
      setError(true);
      console.error('Error:', error);
    });
  }

  const clearError = () => {
    console.log("clear error");
    setError(false);
  }

  return (
    <Fragment >
      <main className={styles.main}>
        <section>
          <h1>Fun with AI</h1>
        </section>
        <PromptForm onSubmitPrompt={onSubmitPrompt}/>
        <ResponseList loading={isLoading} results={results} hasError={error} onClose={clearError}/>
      </main>
    </Fragment>
  );
}

export default App;
