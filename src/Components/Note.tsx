import React,{FormEvent, useRef,useState} from 'react'
import {Form,Stack,Row,Col,Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CreatableSelect from 'react-select/creatable';
import { NoteData } from '../shared/Types';
const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

type NoteFormProps={
    onSubmit:(data:NoteData)=>void
}
const Note = ({onSubmit}:NoteFormProps) => {
    const titleRef=useRef<HTMLInputElement>(null);
    const markdownRef=useRef<HTMLTextAreaElement>(null);
    const [selectedTags,setSelectedTags]=useState<Tag[]>([])
    function handleSubmit(e:FormEvent){
        e.preventDefault();
        onSubmit({
            title:titleRef.current!.value,
            markdown:markdownRef.current!.value,
            tags:[]
        })
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
                    <CreatableSelect isMulti options={options} 
                    value={selectedTags.map(tag=>{
                        return { label:tag.label,
                                  value:tag.id

                        }
                   
                    })}
                    onChange={tags=>{
                        setSelectedTags(tags.map(tag=>{
                            return{
                                label:tag.label,
                                id:tag.value
                            }
                        }))
                    }}
                    
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
