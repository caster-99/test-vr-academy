import { useState, useMemo } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Grid,
    TablePagination,
    Alert,
    CircularProgress,
    Button
} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { useCourses, useCourseType } from 'hooks/useCourses';
import { useTeachers } from 'hooks/useTeachers';
import ClearIcon from '@mui/icons-material/Clear';
import Loader from 'ui-component/Loader';

const CourseTypeName = ({ id }: { id: number }) => {
    const { courseType, loading } = useCourseType(id);
    if (loading) return <span><Loader /></span>;
    return <span>{courseType?.name || `Curso ${id}`}</span>;
};

const CourseList = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selectedTeacher, setSelectedTeacher] = useState<number | ''>('');

    const { teachers, loading: teachersLoading } = useTeachers();

    const {
        courses,
        pagination,
        loading: coursesLoading,
        error,
        setPage: setApiPage,
        setLimit: setApiLimit
    } = useCourses(page + 1, rowsPerPage, selectedTeacher ? Number(selectedTeacher) : undefined);


    const handleTeacherChange = (event: any) => {
        setSelectedTeacher(event.target.value);
        setPage(0);
        setApiPage(1);
    };

    const handleClearFilters = () => {
        setSelectedTeacher('');
        setPage(0);
        setApiPage(1);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
        setApiPage(newPage + 1);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newLimit = parseInt(event.target.value, 10);
        setRowsPerPage(newLimit);
        setPage(0);
        setApiPage(1);
        setApiLimit(newLimit);
    };

    return (
        <MainCard title="Listado de Cursos">
            <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <FormControl fullWidth>
                        <InputLabel id="teacher-select-label">Filtrar por Profesor</InputLabel>
                        <Select
                            labelId="teacher-select-label"
                            id="teacher-select"
                            value={selectedTeacher}
                            label="Filtrar por Profesor"
                            onChange={handleTeacherChange}
                            disabled={teachersLoading}

                        >
                            <MenuItem value="">
                                <em>Todos</em>
                            </MenuItem>
                            {teachers.map((teacher) => (
                                <MenuItem key={teacher.id} value={teacher.id}>
                                    {teacher.firstName} {teacher.lastName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid sx={{ xs: 12, md: 6 }}>
                    <Button
                        variant="outlined"
                        startIcon={<ClearIcon />}
                        onClick={handleClearFilters}
                        disabled={!selectedTeacher}
                        fullWidth
                        sx={{ height: '100%' }}
                    >
                        Limpiar
                    </Button>
                </Grid>
            </Grid>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="courses table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre de la Materia</TableCell>
                            <TableCell>Nombre del Profesor</TableCell>
                            <TableCell>Nombre de la Escuela</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {coursesLoading ? (
                            <TableRow>
                                <TableCell colSpan={3} align="center">
                                    <CircularProgress />
                                </TableCell>
                            </TableRow>
                        ) : courses.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={3} align="center">
                                    No se encontraron cursos
                                </TableCell>
                            </TableRow>
                        ) : (
                            courses.map((course) => (
                                <TableRow key={course.id}>
                                    <TableCell>
                                        <CourseTypeName id={course.courseTypeId} />
                                    </TableCell>
                                    <TableCell>{course.teacherName || 'N/A'}</TableCell>
                                    <TableCell>{course.schoolName || 'N/A'}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={pagination.total}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </MainCard>
    );
};

export default CourseList;
