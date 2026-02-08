import { CreateTeacherPayload } from 'types/teacher';
import MainCard from 'ui-component/cards/MainCard';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useTeachers } from 'hooks/useTeachers';
import { Formik } from 'formik';
import { Box, Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { useSchools } from 'hooks/useLocations';

const TeacherCreate = () => {
    const navigate = useNavigate();
    const { createTeacher, loading, error } = useTeachers();
    const { schools } = useSchools();
    const validateSchema = {
        firstName: Yup.string().required('El nombre es requerido'),
        lastName: Yup.string().required('El apellido es requerido'),
        birthDate: Yup.string().required('La fecha de nacimiento es requerida').matches(/\d{4}-\d{2}-\d{2}/, 'La fecha de nacimiento debe estar en formato YYYY-MM-DD').test('notFuture', 'La fecha no puede ser futura', (value) => {
            if (!value) return true;
            const date = new Date(value);
            const today = new Date();
            return date <= today;
        }),
        schoolId: Yup.number().min(1, 'La escuela es requerida').required('La escuela es requerida'),
    }
    const initialValues: CreateTeacherPayload = {
        firstName: '',
        lastName: '',
        birthDate: '',
        schoolId: 0,
    }
    const handleSubmit = async (values: CreateTeacherPayload) => {
        try {
            await createTeacher(values);
            navigate('/teachers');

        } catch (error) {
            console.error('Error al crear profesor:', error);
        }
    }
    return (
        <MainCard title="Crear Profesor">
            <Formik initialValues={initialValues} validationSchema={Yup.object(validateSchema)} onSubmit={handleSubmit}>
                {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <FormControl fullWidth error={Boolean(touched.firstName && errors.firstName)}>
                                    <TextField
                                        id="firstName"
                                        name="firstName"
                                        value={values.firstName}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="Nombre"

                                    />
                                    {touched.firstName && errors.firstName && (
                                        <FormHelperText error>{errors.firstName as string}</FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <FormControl fullWidth error={Boolean(touched.lastName && errors.lastName)}>
                                    <TextField
                                        id="lastName"
                                        name="lastName"
                                        value={values.lastName}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="Apellido"

                                    />
                                    {touched.lastName && errors.lastName && (
                                        <FormHelperText error>{errors.lastName as string}</FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <FormControl fullWidth error={Boolean(touched.birthDate && errors.birthDate)}>

                                    <TextField
                                        id="birthDate"
                                        type="date"
                                        name="birthDate"
                                        value={values.birthDate}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="Fecha de Nacimiento"
                                        sx={{
                                            // when the input is focused, the label should be at the top, if not it should be in the middle
                                            '& .MuiFormLabel-root': {
                                                top: '-12px',
                                            },
                                            '& .MuiFormLabel-root.Mui-focused': {
                                                top: '0px',
                                            },


                                        }}

                                    />
                                    {touched.birthDate && errors.birthDate && (
                                        <FormHelperText error>{errors.birthDate as string}</FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <FormControl fullWidth error={Boolean(touched.schoolId && errors.schoolId)} >
                                    <InputLabel id="school-label">Escuela</InputLabel>
                                    <Select
                                        labelId="school-label"
                                        id="schoolId"
                                        name="schoolId"
                                        value={values.schoolId}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        label="Escuela"
                                        sx={{
                                            '& .MuiSelect-select': {
                                                py: '16px'
                                            }
                                        }}
                                    >
                                        <MenuItem value={0} disabled>
                                            Seleccione una escuela
                                        </MenuItem>
                                        {schools.map((school) => (
                                            <MenuItem key={school.id} value={school.id}>
                                                {school.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {touched.schoolId && errors.schoolId && (
                                        <FormHelperText error>{errors.schoolId}</FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>

                            <Grid size={{ xs: 12 }}>
                                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                                    <AnimateButton>
                                        <Button
                                            color="secondary"
                                            variant="contained"
                                            size="large"
                                            type="submit"
                                            disabled={loading}
                                            sx={{ px: 4 }}
                                        >
                                            {loading ? 'Guardando...' : 'Crear Profesor'}
                                        </Button>
                                    </AnimateButton>
                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
        </MainCard>
    );
};

export default TeacherCreate;
