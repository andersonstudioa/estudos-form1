import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
//import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from '../Header';
import {useState} from 'react';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      {' Estudos do Anderson '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function MyForm() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get('name'),
    });
  };

  //setEndereco retorna o que está definido na função manipularEndereco
  const [endereco, setEndereco] = useState({})

  //Função chamada no evento onChange
  function manipularEndereco (evento: React.ChangeEvent<HTMLInputElement>) {
    //console.log(evento.target.value)

    const cep = evento.target.value

    //console.log(cep)
    setEndereco ({
      cep
    })

    if (cep && cep.length === 8) {
        fetch(`https://viacep.com.br/ws/${cep}/json`)
        .then(resposta => resposta.json())
        .then(dados => {
            setEndereco(enderecoAntigo => {
                //console.log(dados)
                return {
                    ...enderecoAntigo, //React mantem na memória o endereço antigo
                    bairro: dados.bairro,
                    cidade: dados.localidade,
                    estado: dados.uf
                }
            })
        })
    }
    //console.log(endereco)
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Header />
          <p><em>Testar variável: endereco.cep</em></p>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Nome completo"
              name="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="cep"
              label="Digite seu CEP"
              name="cep"
              onChange={manipularEndereco}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="logradouro"
              label="Rua"
              name="logradouro"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="bairro"
              label="Bairro"
              name="bairro"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="localidade"
              label="Cidade"
              name="localidade"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="uf"
              label="Estado"
              name="uf"
              autoFocus
            />
            <FormControlLabel
              control={<Checkbox value="accept" color="primary" />}
              label="Aceito os termos de uso"
            />
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              color="secondary"
              sx={{ mt: 3, mb: 2 }}
            >
              Criar conta
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}