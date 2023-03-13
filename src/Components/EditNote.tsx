import React from 'react'
import Note from './Note'
import { NoteData, Tag } from '../App'
import { useNote } from './NoteLayOut'
type NewNoteProps = {
    onSubmit: (id:string,data: NoteData) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
}

const EditNote = ({onSubmit,onAddTag,availableTags}:NewNoteProps) => {
    const note = useNote()

    return (
    <div>
      <h1>New Note</h1>
      <Note 
      
      onSubmit={data => onSubmit(note.id, data)}
        onAddTag={onAddTag}
        availableTags={availableTags}
     

      />
    </div>
  )
}

export default EditNote
