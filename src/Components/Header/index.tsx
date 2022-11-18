import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import Typography from '@mui/material/Typography';

export default function Header() {

    function Mensagem(props: any) {
        return (
          <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Digite um CEP válido para completar o endereço'}
          </Typography>
        );
      }

    return (
        <>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <Person2OutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Nova conta de usuário
            </Typography>
            <Mensagem />
            
        </>
        
    )
    
}
