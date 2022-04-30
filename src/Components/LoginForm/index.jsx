import { Button, FormControl, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { fireBaseErrors } from '../../Constants/errors';
import { signIn } from '../../Helpers/Firebase';

const LoginForm = ({authed}) => {
    const {redirect} = useParams();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();

        setError('');
        signIn(email, password).catch((error) => {
            setError(fireBaseErrors[error.code]);
        });
    };

    if (authed) {
        if (!redirect) {
            return (
                <Navigate to={"/"} replace />
            );
        } else {
            return (
                <Navigate to={"/" + redirect} replace />
            );
        }
    }

    return(
        <div className='loginForm'>
            <Typography variant="h2" component="h2" fontSize={24} fontWeight={500} textAlign={"center"}>Sign In</Typography>
            <form action='' onSubmit={submitHandler} className='loginForm__form'>
                <FormControl fullWidth sx={{m:1}}>
                    <TextField value={email} className='loginForm__input' id='email' label='Email' type='text' variant='standard' onChange={(e) => {setEmail(e.target.value)}}/>
                </FormControl>
                <FormControl fullWidth sx={{m:1}}>
                    <TextField value={password} className='loginForm__input' id='password' label='Password' type='password' variant='standard' onChange={(e) => {setPassword(e.target.value)}} />
                </FormControl>
                <FormControl fullWidth sx={{m:1}}>
                    <Button type='submit' variant="contained">Sign In</Button>
                </FormControl>
            </form>
            {error && <Typography variant='caption' display='block' margin={1} color={'red'} fontWeight={500}>{error}</Typography>}
        </div>
    );
};

export {LoginForm};