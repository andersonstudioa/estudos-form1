import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
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

    interface enderecoTipo {
        cep: string,
        logradouro: string,
        bairro: string,
        cidade: string,
        estado: string
    }

    //setEndereco retorna o que está definido na função manipularEndereco
    const [endereco, setEndereco] = useState<enderecoTipo>({
        cep: '',
        logradouro: '',
        bairro: '',
        cidade: '',
        estado: ''
    })

    //Função chamada no evento onChange
    function manipularEndereco (evento: React.ChangeEvent<HTMLInputElement>) {

    const cepAtual = evento.target.value
    
    setEndereco ({cep: cepAtual, logradouro: '', bairro: '', cidade: '', estado: ''})
    console.log(endereco)

    if (cepAtual && cepAtual.length === 8) {
        fetch(`https://viacep.com.br/ws/${cepAtual}/json`)
        .then(resposta => resposta.json())
        .then(dados => {
            setEndereco(enderecoAntigo => {
                //console.log(dados)
                return {
                    ...enderecoAntigo, //React mantem na memória o endereço antigo
                    logradouro: dados.logradouro,
                    bairro: dados.bairro,
                    cidade: dados.localidade,
                    estado: dados.uf
                }
            })
        })
    }
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
              value={endereco.logradouro}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="bairro"
              label="Bairro"
              name="bairro"
              value={endereco.bairro}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="localidade"
              label="Cidade"
              name="localidade"
              value={endereco.cidade}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="uf"
              label="Estado"
              name="uf"
              value={endereco.estado}
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