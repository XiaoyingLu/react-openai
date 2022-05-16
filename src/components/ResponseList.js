import React, { useState } from "react";
import styles from "./ResponseList.module.css";

const ResponseList = React.memo(({loading, results, hasError, onClose}) => {
  
  const closeError = (event) => {
    event.preventDefault();
    onClose();
  }
  return (
    <section className={styles.container}>
      <h2>Responses</h2>
      {loading && <div className={styles.loader}></div> }
      {hasError && 
      <div className={styles.error}>
          <p>An error occurred</p>
          <a className={styles.close} onClick={closeError}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
          </a>
      </div>}
      <ul className={styles.results}>
        {results.map(result => 
        <li className={styles.card} key={result.id}>
          <div>
            <h4>Prompt:</h4>
            <p>{result.prompt}</p>
            </div>
            <div>
            <h4>Response:</h4>
            <p>{result.response}</p>
          </div>
        </li>)}
      </ul>
    </section>
    )
});

export default ResponseList;