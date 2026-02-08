import Typography from '@mui/material/Typography';
import MainCard from 'ui-component/cards/MainCard';

const CourseList = () => (
    <MainCard title="Listado de Cursos">
        <Typography variant="body2">
            Aquí se mostrará el listado de cursos paginado con filtro por profesor.
        </Typography>
    </MainCard>
);

export default CourseList;
