import { Alert, Box, CardContent, Chip, Divider, Grid, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { useTeacherDetail } from "hooks/useTeachers";
import { useSchools } from "hooks/useLocations";
import { useCourseType } from "hooks/useCourses";
import { useParams } from "react-router-dom";
import MainCard from "ui-component/cards/MainCard";
import Loader from "ui-component/Loader";
import SchoolIcon from '@mui/icons-material/School';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import CakeIcon from '@mui/icons-material/Cake';
import BookIcon from '@mui/icons-material/Book';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PublicIcon from '@mui/icons-material/Public';
import MapIcon from '@mui/icons-material/Map';
import { RelatedSchools } from "./RelatedSchools";

// Componente para mostrar el nombre del tipo de curso
const CourseTypeName = ({ id }: { id: number }) => {
    const { courseType, loading } = useCourseType(id);
    if (loading) return <Loader />;
    return <span>{courseType?.name || `Curso ${id}`}</span>;
};

const TeacherView = () => {
    const { id } = useParams<{ id: string }>();
    const { teacher, loading, error } = useTeacherDetail(Number(id));

    return (
        <MainCard title="Detalle del profesor">
            {loading ? (
                <Loader />
            ) : error ? (
                <Alert severity="error">{error}</Alert>
            ) : teacher ? (
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <MainCard title="Información Personal">
                            <List>
                                <ListItem>
                                    <ListItemIcon><AccountCircleIcon color="primary" /></ListItemIcon>
                                    <ListItemText
                                        primary="Nombre Completo"
                                        secondary={`${teacher.firstName} ${teacher.lastName}`}
                                    />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                                <ListItem>
                                    <ListItemIcon><CakeIcon color="secondary" /></ListItemIcon>
                                    <ListItemText
                                        primary="Fecha de Nacimiento"
                                        secondary={teacher.birthDate}
                                    />
                                </ListItem>
                            </List>
                        </MainCard>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <MainCard title="Ubicación y Escuela">
                            <List>
                                <ListItem>
                                    <ListItemIcon><SchoolIcon color="error" /></ListItemIcon>
                                    <ListItemText
                                        primary="Escuela"
                                        secondary={teacher.school.name}
                                    />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                                <ListItem>
                                    <ListItemIcon><LocationCityIcon color="action" /></ListItemIcon>
                                    <ListItemText
                                        primary="Ciudad"
                                        secondary={teacher.city.name}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon><MapIcon color="action" /></ListItemIcon>
                                    <ListItemText
                                        primary="Estado"
                                        secondary={teacher.state.name}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon><PublicIcon color="action" /></ListItemIcon>
                                    <ListItemText
                                        primary="País"
                                        secondary={teacher.country.name}
                                    />
                                </ListItem>
                            </List>
                        </MainCard>
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <MainCard title={`Materias impartidas (${teacher.courses.length})`}>
                            {teacher.courses.length > 0 ? (
                                <Grid container spacing={1}>
                                    {teacher.courses.map((course) => (
                                        <Grid key={course.id}>
                                            <Chip
                                                icon={<BookIcon />}
                                                label={<CourseTypeName id={course.courseTypeId} />}
                                                variant="outlined"
                                                color="primary"
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            ) : (
                                <Typography variant="body2" color="textSecondary">
                                    No tiene materias asignadas actualmente.
                                </Typography>
                            )}
                        </MainCard>
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <RelatedSchools stateId={teacher.state.id} currentSchoolId={teacher.school.id} stateName={teacher.state.name} />
                    </Grid>

                </Grid>
            ) : (
                <Alert severity="warning">No se encontró el profesor</Alert>
            )}
        </MainCard>
    );
};

export default TeacherView;
