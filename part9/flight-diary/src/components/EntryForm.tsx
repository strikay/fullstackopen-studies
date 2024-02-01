import { useState } from 'react';
import { DiaryEntry, Visibility, Weather} from '../types';
import axios from 'axios';

interface RadioGroupProps {
    collection: string[],
    collectionName: string,
    collectionValue: string
    onChangeAction: React.Dispatch<React.SetStateAction<string>>
}

const RadioGroup = (props: RadioGroupProps) => {
    const collection = Object.values(props.collection);
    return (
      <div>
        {props.collectionName + ' '}
        {collection.map(value => {
          return (
            <span key={value}>
              {value}
              <input 
                type='radio' 
                name={props.collectionName} 
                checked = {props.collectionValue === value}
                onChange={(e) => {e; props.onChangeAction(value)}}
              />
            </span>)
        })}
      </div>
    )
  }

const EntryForm = () => {

    const [date, setDate] = useState<string>('')
    const [visibility, setVisibility] = useState<string>('')
    const [weather, setWeather] = useState<string>('')
    const [comment, setComment] = useState<string>('')
    const [notification, setNotification] = useState<string>('');

    const addEntry = (event: React.SyntheticEvent) => {
      event.preventDefault();
      const entry = {date, visibility, weather, comment};
      axios.post<DiaryEntry>('http://localhost:3001/api/diaries', entry).then(response => {
        response
      }).catch((error) => {
        if (axios.isAxiosError(error)) {
          if(error.response){
            setNotification((error.response.data).replace("Something went wrong.", ""));
          }
          setTimeout(()=>{setNotification('')}, 5000);
        } else {
          console.error(error);
        }
      });
    }
    return (
      <div>
        <h2>Add  entry</h2>
        {notification && <div style={{color:'red'}}>{notification}</div>}
        <form onSubmit={addEntry}>
          <div>
            date <input type='date' value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div>
            <RadioGroup 
              collection={Object.values(Visibility)} 
              collectionName='visibility' 
              collectionValue={visibility} 
              onChangeAction={setVisibility}/>
          </div>
          <div>
            <RadioGroup 
              collection={Object.values(Weather)} 
              collectionName='weather' 
              collectionValue={weather} 
              onChangeAction={setWeather}/>
          </div>
          <div>
            comment <input value={comment} onChange={(e) => setComment(e.target.value)} />
          </div>
          <button type='submit'>add</button>
        </form>
      </div>
    )
  }
  
  export default EntryForm;