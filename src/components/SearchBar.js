import React from 'react';
import Form from 'react-bootstrap/Form';
import { InputGroup, FormControl } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';


const SearchBar = ({ callback, searchVal }) => (
    <Form>
        <Form.Label htmlFor="inlineFormInputGroup" srOnly>
            Search
        </Form.Label>
        <InputGroup className="mb-2">
            <InputGroup.Prepend>
                <InputGroup.Text><Search /></InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl id="inlineFormInputGroup" value={searchVal} placeholder="Search" onChange={(e) => callback(e.target.value)} />
        </InputGroup>
    </Form>
);

export default SearchBar;