
import React, { useState } from 'react';
import { TextField, Box, Button } from '@mui/material';
import './spinner.css';
import './Loading'
import './index.css';

const Form = () => {
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
  };

  return (
    <>
      {/* { isLoading && <div> <Loading/> </div>} */}
      <Box
      component="form"
      id ='box'
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
    <form onSubmit={handleSubmit}>
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
      />
      <TextField
        label="Subject"
        variant="outlined"
        name="subject"
        value={subject}
        onChange={handleChange}
        fullWidth
        margin="normal"
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
      />
      
      <Button type='submit' variant="contained" >Submit</Button>
      </form>
      </Box>
      </>
)
  }

  export default Form;