import { useMemo } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from 'react-bootstrap';
import {Routes,Route, Navigate} from 'react-router-dom'
import NewNote from './Components/NewNote';
import { v4 as uuidV4 } from "uuid"
import useLocalStorage from './useLocalStorage';
import {NoteList }from './Components/NoteList';
import { NoteLayout } from './Components/NoteLayOut';
import { ShowNote } from './Components/ShowNote';
export type Note = {
  id: string
} & NoteData

export type RawNote = {
  id: string
} & RawNoteData

export type RawNoteData = {
  title: string
  markdown: string
  tagIds: string[]
}

export type NoteData = {
  title: string
  markdown: string
  tags: Tag[]
}

export type Tag = {
  id: string
  label: string
}

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", [])
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [])

  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return { ...note, tags: tags.filter(tag => note.tagIds.includes(tag.id)) }
    })
  }, [notes, tags])
//CreateNotes
  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes(prevNotes => {
      return [
        ...prevNotes,
        { ...data, id: uuidV4(), tagIds: tags.map(tag => tag.id) },
      ]
    })
  }
  function addTag(tag: Tag) {
    setTags(prev => [...prev, tag])
  }
  function onDeleteNote(id: string) {
    setNotes(prevNotes => {
      return prevNotes.filter(note => note.id !== id)
    })
  }

  return (
   <Container className='ml-4'>
     <Routes>
    <Route path="/" element={<NoteList 
    availableTags={tags} 
    onAddTag={addTag}
    notes={notesWithTags}
    />}
    />
    <Route path="/new" element={<NewNote  
    onSubmit={onCreateNote}
    onAddTag={addTag}
    availableTags={tags}
    />}/>
 <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
          <Route index element={<ShowNote 
          onDelete={onDeleteNote}
           />} />
          <Route
            path="edit"
            element={
              <h1>EDit</h1>
            }
          />
        </Route>
<Route path="*" element={<Navigate to="/"/>}/>


   </Routes>
   </Container>
  )
}

export default App
