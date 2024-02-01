import { DiaryEntry } from "../types";

interface EntryProps {
    diaryEntry: DiaryEntry
  }
  interface ContentProps {
    diaryEntries: DiaryEntry[]
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

export default Content
