import React, {useState, useEffect} from 'react';
import { Link, Redirect } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Copyright from'./Copyright.js';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import frLocale from "date-fns/locale/fr";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'

import UserApi from '../api/user.js'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(10, 0, 2),
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

export default function SignUp() {
  const classes = useStyles();

  const [formData , setFormData] = useState({});
  const [phone , setPhone] = useState();
  const [fieldError , setFieldError] = useState({});
  const [errorMess , setErrorMess] = useState({});
  const [formError , setFormError] = useState(false);

  const [redirection, setRedirection] = useState(false)

  const handleChange = (e) =>{
    //console.log("champ ",e.target.name, ", valeur : ",e.target.value)
    setFormData(prevState => ({
      ...prevState, [e.target.name]:e.target.value
    }));
  }

  const handleDateChange = (date) => {
    setFormData(prevState => ({
      ...prevState, 'birthdate':date
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

  const submitForm = async () => {
    if (formData.name && formData.email && formData.password && formData.password2){
      //console.log("complet form Data",formData)
      UserApi.register(formData)
        .then( (response) => {
          console.log(response)
          //console.log(response.data, "/////", response.status)
          if (response.status === 201){
            // redirection login
            setRedirection(true)
          }
        })
        .catch( (err) => {
          console.log(err);
          setErrorMess({form: "Erreur lors de l'enregistrement. Veuillez réessayer plus tard !"})
          setFormError(true);
        })
        
    } else {
      setErrorMess({form: "Les champs marqués d'une étoile sont obligatoires !"})
      setFormError(true);
    }
  };

  const handleClose = () => {
    setFormError(false);
  };

  useEffect( () => {
    if (formData.password !== formData.password2){
      setErrorMess({password2: "Les  mots de passe doivent être identiques !"})
      setFieldError({password2: true})
    } else {
      //console.log("mdp pareil !!!", "1:",formData.password, " 2:", formData.password2)
      setErrorMess({password2: ""})
      setFieldError({password2: false})
    }
  }, [formData.password2])

  useEffect( () => {
    checkMailFormat()
  }, [formData.email])

  useEffect(() => {
    if (phone){
      setFormData(prevState => ({
        ...prevState, 'phone':phone
      }));
    }
  }, [phone])

  return (
    <Container component="main" maxWidth="xs">
      {redirection ? <Redirect to="/signin" /> : ''}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Créer un compte
        </Typography>
        
          <Grid container spacing={2} className={classes.form}>
            <Grid item xs={12}>
              <TextField
                value={formData.name}
                variant="outlined"
                required
                fullWidth
                name="name"
                label="Nom"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={fieldError.email}
                value={formData.email}
                variant="outlined"
                required
                fullWidth
                name="email"
                label="Adresse Email"
                onChange={handleChange}
                helperText={errorMess.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={formData.password}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Mot de passe"
                type="password" 
                onChange={handleChange}
                helperText={errorMess.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={fieldError.password2}
                value={formData.password2}
                variant="outlined"
                required
                fullWidth
                name="password2"
                label="Confirmation mot de passe"
                type="password"
                onChange={handleChange}
                helperText={errorMess.password2}
              />
            </Grid>
            <Grid item xs={12}>
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={frLocale}>
                <KeyboardDatePicker
                  margin="normal"
                  inputVariant="outlined"
                  fullWidth
                  name="birthdate"
                  label="Date de naissance"
                  maxDate={Date()}
                  format="dd/MM/yyyy"
                  value={formData.birthdate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>

            <Grid item xs={12}>
              <PhoneInput
                country={'fr'}
                name="Téléphone"
                fullWidth
                value={phone}
                onChange={setPhone}
                placeholder="(+33)1 23 45 67 89"
              />
            </Grid>

          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={submitForm}
          >
            Créer un compte
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/signin" className={classes.link}>
                Vous avez déjà un compte ? Connectez-vous.
              </Link>
            </Grid>
          </Grid>
        
        <Snackbar open={formError} autoHideDuration={5000} onClose={handleClose}>
          <MuiAlert elevation={6} variant="filled" severity="error">
            {errorMess.form}
          </MuiAlert>
        </Snackbar>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
