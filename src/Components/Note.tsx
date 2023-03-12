import React,{FormEvent, useRef,useState} from 'react'
import {Form,Stack,Row,Col,Button} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import CreatableReactSelect from 'react-select/creatable';
import { v4 as uuidV4 } from "uuid"

  type Tag = {
    id: string
    label: string
  }
  
   type NoteData = {
    title: string
    markdown: string
    tags: Tag[]
  }
type NoteFormProps={
    onSubmit:(data:NoteData)=>void;
  onAddTag: (tag: Tag) => void;
    availableTags:Tag[];
}

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
const Note = ({onSubmit,onAddTag,availableTags}:NoteFormProps) => {
    const titleRef=useRef<HTMLInputElement>(null);
    const markdownRef=useRef<HTMLTextAreaElement>(null);
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const Navigate=useNavigate();
        function handleSubmit(e:FormEvent){
        e.preventDefault();
        onSubmit({
            title:titleRef.current!.value,
            markdown:markdownRef.current!.value,
            tags:selectedTags
        })

        Navigate("..")

    }
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Stack gap={4}>
            <Row>
                <Col>
                <Form.Group controlId="title">
                    <Form.Label>Title:-</Form.Label>
                    <Form.Control ref={titleRef} required/>
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
                   
                </Form.Group>
                </Col>

            </Row>
            <Form.Group controlId="markdown">
                    <Form.Label>Body:-</Form.Label>
                    <Form.Control ref={markdownRef} required as="textarea" rows={15} />                   
                </Form.Group>


        </Stack>
        <Stack direction='horizontal'  gap={3} className="justify-content-end mt-5">
            <Button type="submit" variant="primary">Save</Button>
          <Link to="/">
          <Button type="button"  variant="outline-secondary">Cancel</Button>
          </Link>
        </Stack>

      </Form>
    </div>
  )
}

export default Note
