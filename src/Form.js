
import React, { useState } from 'react';
import { TextField, Box, Button } from '@mui/material';
import './spinner.css';
import './index.css';
import Loading from './Loading';

const Form = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'subject') {
      setSubject(value);
    } else if (name === 'message') {
      setMessage(value);
    }
    console.log(event);
  };
 

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors({});
    setIsSuccess(false);

    if (!name) {
      setErrors((prevState) => ({
        ...prevState,
        name: 'Name is required',
      }));
    }
    if (!email) {
      setErrors((prevState) => ({
        ...prevState,
        email: 'Email is required',
      }));
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setErrors((prevState) => ({
        ...prevState,
        email: 'Email is invalid',
      }));
    }
    if (!message) {
      setErrors((prevState) => ({
        ...prevState,
        message: 'Message is required',
      }));
    }

    if (name && email && message) {
      setIsLoading(true);
      fetch('https://my-json-server.typicode.com/tundeojediran/contacts-api-server/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'

        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
        })
      })
        .then((respose) => respose.json())
        .then((respose) => {
          setIsSuccess(respose.data);
          setIsLoading(false);
        })
        .catch(() => {
          setErrors((prevState) => ({
            ...prevState,
            submit: 'Unable to submit the form. Please try again later',
          }));
          setIsLoading(false);
        });
    }
    props.submitForm()
    
  };

  return (
    <>
     
      <Box
      component="form"
      id ='box'
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <h1>Contact Us</h1>
    <div onSubmit={handleSubmit} className='form'>
      <TextField
        label="Name"
        required
        variant="outlined"
        name="name"
        value={name}
        onChange={handleChange}
        error={errors.name}
        helperText={errors.name}
        fullWidth
        margin="normal"
        className='textfield'
      />
      <TextField
        label="Email"
        required
        variant="outlined"
        name="email"
        value={email}
        onChange={handleChange}
        error={errors.email}
        helperText={errors.email}
        fullWidth
        margin="normal"
        className='textfield'
      />
      <TextField
        label="Subject"
        variant="outlined"
        name="subject"
        value={subject}
        onChange={handleChange}
        fullWidth
        margin="normal"
        className='textfield'
      />
      <TextField
        label="Message"
        variant="outlined"
        name="message"
        value={message}
        onChange={handleChange}
        error={errors.message}
        helperText={errors.message}
        fullWidth
        margin="normal"
        multiline
        rows={4}
        className='textfield'
      />
      
      <Button type='submit' variant="contained" >Submit</Button>
      </div>
      </Box>
      { isLoading && <div> <Loading/> <p>Thank you for submitting!</p></div>}
      </>
)
  }

  export default Form;