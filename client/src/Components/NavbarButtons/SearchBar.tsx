import React, { useRef } from 'react'
import './Navbarbuttons.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {

  const navigate = useNavigate()

  const searchTerm = useRef<HTMLInputElement>()

  const handleSearch = async (e: React.FormEvent, tags: string) => {

    e.preventDefault()
    
    navigate(`/search/?tags=${await JSON.stringify(tags.split(' '))}`)
    
  }

  return (
    <div>
         <Form className="d-flex" onSubmit={(e) => handleSearch(e, searchTerm!!.current!!.value)}>
            <Form.Control
              ref={searchTerm as React.RefObject<HTMLInputElement>}
              type="search"
              placeholder="Search"
              className="searchBar me-2"
              aria-label="Search"
            />
            <Button 
              className="searchBtn" 
              variant="outline-success" 
              size='sm'
              onClick={(e) => handleSearch(e, searchTerm!!.current!!.value)}
            >
              Search
            </Button>
          </Form>
    </div>
  )
}

