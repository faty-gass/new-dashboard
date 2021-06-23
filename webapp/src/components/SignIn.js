import React, {useState, useEffect} from 'react';
import {Link }from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import Copyright from'./Copyright.js';


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  page : {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    color : '#0000FF',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
      textDecorationStyle: 'solid'
    },
    '&:active':{
      color : 'purple'
    },
    '&:visited': {
      color : 'purple'
    }
  }
}));

export default function SignIn() {
  const classes = useStyles();

  const [formData, setFormData] = useState({});
  const [formError, setFormError] = useState(false);
  const [ errorMess, setErrorMess] = useState({})
  const [fieldError , setFieldError] = useState({});


  const handleChange = (e) => {
    setFormData(prevState => ({
      ...prevState, [e.target.name]:e.target.value
    }));
  }

  const checkMailFormat = () => {
    if (formData.email && !formData.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
      setErrorMess({email: "Merci d'entrer un email valide !"})
      setFieldError({email : true})
    } else {
      setFieldError({email : false})
      setErrorMess({email: ""})
    }
  };

  const submitForm = () => {
    console.log(formData)
    if (formData.email && formData.password){

    } else {
      setFormError(true);
      setErrorMess({form : "Tous les champs sont obligatoires !"})
    }
  }

  const handleClose = () => {
    setFormError(false);
  };

  useEffect( () => {
    checkMailFormat()
  }, [formData.email])

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={6} className={classes.image} />
      <Grid className={classes.page} item xs={12} sm={8} md={6} component={Paper} elevation={6} square >
        <Container className={classes.paper} maxWidth="xs">
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
            <TextField
              error={fieldError.email}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Adresse Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              helperText={errorMess.email}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Mot de passe"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={submitForm}
            >
              Connexion
            </Button>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Link href="#" className={classes.link} >
                  Mot de passe oublié ?
                </Link>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Link to="/signup" className={classes.link}>
                  Pas de compte ? Inscrivez-vous !
                </Link>
              </Grid>
            </Grid>
            <Snackbar open={formError} autoHideDuration={5000} onClose={handleClose}>
              <MuiAlert elevation={6} variant="filled" severity="error">
                {errorMess.form}
              </MuiAlert>
            </Snackbar>
            <Box mt={5}>
              <Copyright />
            </Box>
        </Container>
      </Grid>
    </Grid>
  );
}
