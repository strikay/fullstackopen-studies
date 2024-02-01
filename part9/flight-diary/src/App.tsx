
import { useEffect, useState } from 'react';
import { DiaryEntry, Visibility, Weather} from './types';
import axios from 'axios';
import EntryForm from './components/EntryForm';
import Content from './components/Content';


const App = () => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([
    {
      id: 1,
      date: "2017-01-01",
      weather: Weather.Rainy,
      visibility: Visibility.Poor
      }
  ])

  useEffect(() => {
    axios.get<DiaryEntry[]>('http://localhost:3001/api/diaries').then(response => {
      setDiaryEntries(response.data)
    })
  }, [])


  return (
    <div>
      <EntryForm/>
      <h2>Diary entries</h2>
      <Content diaryEntries={diaryEntries}/>
    </div>
  )

}

export default App;
