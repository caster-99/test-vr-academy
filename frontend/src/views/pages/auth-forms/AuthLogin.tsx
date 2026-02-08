import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Field, Form, Formik, useFormik } from 'formik';
import * as Yup from 'yup';

// material-ui
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import CustomFormControl from 'ui-component/extended/Form/CustomFormControl';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store/index';
import { LoginFormValues } from 'types/auth';
import { clearError, loginUser } from 'store/slices/authSlice';
import { Alert, FormHelperText, Snackbar } from '@mui/material';

// ===============================|| JWT - LOGIN ||=============================== //

export default function AuthLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const initialValues: LoginFormValues = {
    username: '',
    password: ''
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('El usuario es requerido').min(3, 'El usuario debe tener al menos 3 caracteres').max(20, 'El usuario debe tener menos de 20 caracteres'),
    password: Yup.string().required('La contraseña es requerida').min(4, 'La contraseña debe tener al menos 4 caracteres').max(20, 'La contraseña debe tener menos de 20 caracteres')
  });

  const handleSubmit = async (values) => {
    const resultAction = await dispatch(loginUser(values));
    if (loginUser.fulfilled.match(resultAction)) {
      navigate('/dashboard'); // Redirige al éxito
    }
  }

  return (
    <>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
          <Form onSubmit={handleSubmit}>
            <CustomFormControl
              fullWidth
              error={Boolean(touched.username && errors.username)}
            >
              <InputLabel htmlFor="username-login">Username</InputLabel>
              <OutlinedInput
                id="username-login"
                type="text"
                value={values.username}
                name="username"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Username"
              />
              {touched.username && errors.username && (
                <FormHelperText error id="helper-text-username">
                  {errors.username as string}
                </FormHelperText>
              )}
            </CustomFormControl>
            <CustomFormControl
              fullWidth
              error={Boolean(touched.password && errors.password)}
              sx={{ mt: 1 }}
            >
              <InputLabel htmlFor="password-login">Password</InputLabel>
              <OutlinedInput
                id="password-login"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              {touched.password && errors.password && (
                <FormHelperText error id="helper-text-password">
                  {errors.password as string}
                </FormHelperText>
              )}
            </CustomFormControl>
            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button
                  color="secondary"
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  disabled={loading}
                >
                  Iniciar Sesión
                </Button>
              </AnimateButton>
            </Box>
          </Form>
        )}

      </Formik>
      <Snackbar
        open={Boolean(error)}
        autoHideDuration={5000}
        onClose={() => dispatch(clearError())}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>
    </>
  );
}
