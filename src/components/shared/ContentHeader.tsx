import { Typography } from "@mui/material"

const ContentHeader = ({text, sx}: {text: string, sx?:{}}) => {  
    return (
        <Typography variant="h4" component="h1" 
            sx={{color: 'primary', ...sx}}>
            <span>{text}</span>
        </Typography>
    ) 
}

export default ContentHeader