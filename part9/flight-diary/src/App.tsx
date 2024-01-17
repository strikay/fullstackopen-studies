
import { useEffect, useState } from 'react';
import { DiaryEntry, Visibility, Weather} from './types';
import axios from 'axios';


const App = () => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([
    {
      id: 1,
      date: "2017-01-01",
      weather: Weather.Rainy,
      visibility: Visibility.Poor
      }
  ])

  const [date, setDate] = useState<string>('')
  const [visibility, setVisibility] = useState<string>('')
  const [weather, setWeather] = useState<string>('')
  const [comment, setComment] = useState<string>('')
  const [notification, setNotification] = useState<string>('');

  useEffect(() => {
    axios.get<DiaryEntry[]>('http://localhost:3001/api/diaries').then(response => {
      setDiaryEntries(response.data)
    })
  }, [])

  interface EntryProps {
    diaryEntry: DiaryEntry
  }
  interface ContentProps {
    diaryEntries: DiaryEntry[]
  }
  interface RadioGroupProps {
    collection: string[],
    collectionName: string,
    collectionValue: string
    onChangeAction: React.Dispatch<React.SetStateAction<string>>
  }

  const Entry = (props: EntryProps) => {
    const diaryEntry = props.diaryEntry;
    return (
      <div>
        <h3>{diaryEntry.date}</h3>
        <div>visibility: {diaryEntry.visibility}</div>
        <div>weather: {diaryEntry.weather}</div>
      </div>
    )
  }

  const Content = (props: ContentProps) => {
    const diaryEntries = props.diaryEntries
    return(
      <div>
        {diaryEntries.map(entry => {
          return <Entry key={entry.id} diaryEntry={entry}/>
        })}
      </div>
    )
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

  const addEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const entry = {date, visibility, weather, comment};
    axios.post<DiaryEntry>('http://localhost:3001/api/diaries', entry).then(response => {
      console.log(response.data);
    }).catch((error) => {
      if (axios.isAxiosError(error)) {
        console.log(error.status)
        console.error(error.response?.data);
        setNotification(error.response?.data);
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
          {/* visibility <input value={visibility} onChange={(e) => setVisibility(e.target.value)} /> */}
          <RadioGroup 
            collection={Object.values(Visibility)} 
            collectionName='visibility' 
            collectionValue={visibility} 
            onChangeAction={setVisibility}/>
        </div>
        <div>
          {/* weather <input value={weather} onChange={(e) => setWeather(e.target.value)} /> */}
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
      <h2>Diary entries</h2>
      <Content diaryEntries={diaryEntries}/>
    </div>
  )

}

export default App;
