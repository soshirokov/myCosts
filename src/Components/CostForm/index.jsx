import { Button, FormControl, TextField } from '@mui/material';
import { set } from 'firebase/database';
import React, { useState } from 'react';
import { categories } from '../../Constants/costCategories';
import { auth, saveCostRef } from '../../Helpers/Firebase';

const CostForm = () => {
    const startCosts = {};
    categories.forEach((category) => {
        startCosts[category] = 0;
    });
    const [costs, setCosts] = useState(startCosts);

    const submitHandler = (e) => {
        e.preventDefault();
        set(saveCostRef(auth.currentUser.uid, '01-01-2001'), costs);
    };

    return(
        <div className='costForm'>
            <form action='' onSubmit={submitHandler}>
                <FormControl fullWidth sx={{m:1}}>
                    {
                        categories.map((category) => 
                            <TextField 
                                sx={{mb:3}} 
                                label={category} 
                                value={costs[category]} 
                                type='text' 
                                variant='standard' 
                                key={category} 
                                onChange={(e) => {setCosts({...costs, [category]: e.target.value})}}
                            />
                        )
                    }
                </FormControl>
                <FormControl fullWidth sx={{m:1}}>
                    <Button type='submit' variant="contained">Сохранить</Button>
                </FormControl>
            </form>
        </div>
    );
};

export {CostForm};