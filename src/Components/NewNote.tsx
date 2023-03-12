import React from 'react'
import Note from './Note'
import { NoteData, Tag } from '../App'
type NewNoteProps = {
  onSubmit: (data: NoteData) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
}

const NewNote = ({onSubmit,onAddTag,availableTags}:NewNoteProps) => {
  return (
    <div>
      <h1>New Note</h1>
      <Note 
      
      onSubmit={onSubmit}
        onAddTag={onAddTag}
        availableTags={availableTags}
     

      />
    </div>
  )
}

export default NewNote
