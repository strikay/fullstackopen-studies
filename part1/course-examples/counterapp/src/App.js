import { useState } from 'react'
import './App.css';

const Display = ({counter}) => {
  return (
    <div>{counter}</div>
  )
}

const Button = ({handleClick, text}) => {
  return(
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

function App() {
  const [ counter, setCounter ] = useState(0)
  const increaseByOne = () => setCounter(counter + 1)
  const setToZero = () => setCounter(0)

  console.log('rendering...', counter)

  return (
    <div>
      <Display counter={counter}/>
      <Button 
        handleClick={increaseByOne} 
        text={true && <div>plus</div>}
      />
      <Button 
        handleClick={setToZero} 
        text={'zero'}
      />
    </div>
  );
}

export default App;
