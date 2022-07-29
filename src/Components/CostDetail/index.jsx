import { Typography } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

export const CostDetail = ({ label, amount, diff, full = false }) => { 
    const diffStyles = { color: `${diff > 0 ? '#17d34acf' : '#eb3030d2'}`, fontSize: '12px' }
    const arrowStyles = { top: '4px', position: 'relative', fontSize: '16px' }
    const amountStyles = full ? { color: `${diff > 0 ? '#17d34acf' : '#eb3030d2'}` } : {}

    return(
        <>
            <Typography fontSize={12}>{ label }:</Typography>
            <Typography fontSize={16} fontWeight={600} sx={ amountStyles }>
                {amount.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })}
                {diff !== 0 && !full && 
                    <Typography variant="span" sx={diffStyles} noWrap={true}>
                        {diff > 0
                            ? <ArrowDropDownIcon sx={arrowStyles} />
                            : <ArrowDropUpIcon sx={arrowStyles} />}
                        {(Math.abs(diff)).toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })}
                    </Typography>
                }
            </Typography>
        </>
    )
}