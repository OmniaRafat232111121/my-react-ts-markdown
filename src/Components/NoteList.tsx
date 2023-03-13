import React,{useState,useMemo} from 'react'
import { Link } from 'react-router-dom'
import {Button,Col,Form,Row,Stack,Card,Badge} from "react-bootstrap"
import CreatableReactSelect from 'react-select/creatable';
import { v4 as uuidV4 } from "uuid"
import { Tag } from '../App';
import styles from '../NoteList.module.css'

type SimplifiedNoteProps = {
    tags: Tag[]
    title: string
    id: string
  }
type NoteListProps = {
    availableTags: Tag[];
    notes: SimplifiedNoteProps[];
    onAddTag: (tag: Tag) => void;

  
  }
const options = [
    { value: 'Javascript', label: 'Javascript' },
    { value: 'React Js', label: 'React Js' },
    { value: 'TypeScript', label: 'TypeScript' }
  ]
 
  
export function NoteList ({availableTags,notes,onAddTag}:NoteListProps) {
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [title, setTitle] = useState("")
    const filteredNotes = useMemo(() => {
        return notes.filter(note => {
          return (
            (title === "" ||
              note.title.toLowerCase().includes(title.toLowerCase())) &&
            (selectedTags.length === 0 ||
              selectedTags.every(tag =>
                note.tags.some(noteTag => noteTag.id === tag.id)
              ))
          )
        })
      }, [title, selectedTags, notes])
  return (
    <div>
      <Row  className=' align-items-center mt-3'>
<Col>
<h1>Notes</h1>
</Col>
<Col xs="auto" className='mt-3'>
<Stack gap={2} direction={'horizontal'}>
    <Link to="/new">
    <Button variant="primary">Create</Button>
    </Link>
    {/* <Button
             
              variant="outline-secondary"
            >
              Edit Tags
            </Button> */}
</Stack>
</Col>
      </Row>

      <Form >
        <Stack gap={4}>
            <Row>
                <Col>
                <Form.Group controlId="title">
                    <Form.Label>Title:-</Form.Label>
                    <Form.Control
                    type="text"
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                      required/>
                </Form.Group>
                </Col>
                <Col>
                <Form.Group controlId="tag">
                    <Form.Label>Tags:-</Form.Label>
                    <CreatableReactSelect
                    onCreateOption={label => {
                        const newTag = { id: uuidV4(), label }
                        onAddTag(newTag)
                        setSelectedTags(prev => [...prev, newTag])
                      }}
                     value={selectedTags.map(tag => {
                        return { label: tag.label, value: tag.id }
                      })}
                    options={options}
                    onChange={tags => {
                        setSelectedTags(
                          tags.map(tag => {
                            return { label: tag.label, id: tag.value }
                          })
                        )
                      }}
                    isMulti
                    />
                    <Form.Control  required/>
                </Form.Group>
                </Col>

            </Row>
         


        </Stack>
       

      </Form>
      <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
        {filteredNotes.map(note => (
          <Col key={note.id}>
            <NoteCard id={note.id} title={note.title} tags={note.tags} />
          </Col>
        ))}
      </Row>
    </div>
  )
}

function NoteCard({ id, title, tags }: SimplifiedNote) {
    return (
      <Card
        as={Link}
        to={`/${id}`}
        className={`h-100 text-reset text-decoration-none ${styles.card}`}
      >
        <Card.Body>
        <Stack
          gap={2}
          className="align-items-center justify-content-center h-100"
        >
          <span className="fs-5">{title}</span>
          {tags.length > 0 && (
            <Stack
              gap={1}
              direction="horizontal"
              className="justify-content-center flex-wrap"
            >
              {tags.map(tag => (
                <Badge className="text-truncate" key={tag.id}>
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Stack>
        </Card.Body>
      </Card>
    )
  }

