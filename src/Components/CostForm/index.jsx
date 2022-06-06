import { FormControl, TextField } from '@mui/material';
import { onValue, set } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { categories } from '../../Constants/costCategories';
import { auth, costByDateDetailsRef, costByDateRef } from '../../Helpers/Firebase';
import { getDateFromString } from '../../Helpers/Utils/dateFormat';
import { selectedDateStringSelector } from '../../Store/Calendar/selectors';

const CostForm = () => {
    const [costs, setCosts] = useState(categories);

    const selectedDate = useSelector(selectedDateStringSelector);

    useEffect(() => {
        if (auth?.currentUser?.uid) {
            onValue(costByDateDetailsRef(auth.currentUser.uid, selectedDate), (snapshot) => {
                setCosts({...categories, ...snapshot.val()});
            });
        }
    }, [selectedDate]);

    const submitHandler = (e) => {
        e.preventDefault();
    };

    const inputHandler = (e, category) => {
        e.target.value = e.target.value.replace(/[^0-9+-]/g, '').replace('++', '+').replace('--', '-');
        if (+e.target.value === 0) {e.target.value = '';}

        setCosts((prevState) => ({
            ...prevState,
            [category]: e.target.value
        }));
    };

    const blurHandler = (e, category) => {
        e.target.value = /[0-9]/g.test(e.target.value.slice(-1)) ? e.target.value : e.target.value + '0';

        // eslint-disable-next-line
        const toSave =  e.target.value ? eval(e.target.value) : '';

        const newCosts = {...costs, [category]: toSave};

        setCosts(newCosts);
        saveCostsToFirebase(newCosts);
    };

    const keyDowHandler = (e) => {
        if(e.keyCode === 13) {
            e.target.blur()
        }
    };

    const saveCostsToFirebase = (costsToSave) => {
        const info = {
            total: 0,
            d: getDateFromString(selectedDate).getDate(),
            m: getDateFromString(selectedDate).getMonth()+1,
            y: getDateFromString(selectedDate).getFullYear()
        };

        for (let prop in costsToSave) {
            if (costsToSave[prop] === '') { costsToSave[prop] = 0; }
            else { info.total += +costsToSave[prop]; }
        }

        set(costByDateRef(auth.currentUser.uid, selectedDate), {...info, details: costsToSave });
    };

    return(
        <div className='costForm'>
            <form action='' onSubmit={submitHandler}>
                    {
                        Object.keys(categories).map((category) => 
                            <FormControl fullWidth sx={{my:1}} key={category}>
                                <TextField 
                                    label={category} 
                                    value={costs[category] || ''} 
                                    type='text' 
                                    variant='filled' 
                                    size='small'
                                    key={category} 
                                    onChange={(e) => {inputHandler(e, category)}}
                                    onKeyDown={keyDowHandler}
                                    onBlur={(e) => {blurHandler(e, category)}}
                                />
                            </FormControl>
                        )
                    }
            </form>
        </div>
    );
};

export {CostForm};