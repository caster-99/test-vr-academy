import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    CardContent,
    Grid,
    InputAdornment,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableRow,
    TextField,
    Select,
    FormControl,
    InputLabel,
    SelectChangeEvent,
    Button,
    Box
} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { useTeachers } from 'hooks/useTeachers';
import { useCountries, useStates, useCities, useSchools } from 'hooks/useLocations';
import { Teacher } from 'types/teacher';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

const TeacherList = () => {
    const navigate = useNavigate();
    // Paginacion
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');

    // Filtros
    const [selectedCountry, setSelectedCountry] = useState<number | ''>('');
    const [selectedState, setSelectedState] = useState<number | ''>('');
    const [selectedCity, setSelectedCity] = useState<number | ''>('');
    const [selectedSchool, setSelectedSchool] = useState<number | ''>('');
    const [selectedSort, setSelectedSort] = useState<number>(0);

    // imports de Hooks
    const { countries } = useCountries();
    const { states } = useStates(selectedCountry ? Number(selectedCountry) : undefined);
    const { cities } = useCities(selectedState ? Number(selectedState) : undefined);


    const { schools: schoolsByCity } = useSchools(selectedCity ? Number(selectedCity) : undefined);

    const { schools: allSchools } = useSchools();

    const initialFilters = useMemo(() => ({}), []);
    const { teachers, loading, setFilters } = useTeachers(initialFilters);

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            setFilters(prev => ({ ...prev, name: searchTerm }));
        }, 500);
        return () => clearTimeout(timer);
    }, [searchTerm, setFilters]);

    const handleCountryChange = (event: SelectChangeEvent<number>) => {
        const val = Number(event.target.value);
        setSelectedCountry(val);
        setSelectedState('');
        setSelectedCity('');
        setSelectedSchool('');
        setFilters(prev => ({ ...prev, countryId: val, stateId: undefined, cityId: undefined, schoolId: undefined }));
    };

    const handleStateChange = (event: SelectChangeEvent<number>) => {
        const val = Number(event.target.value);
        setSelectedState(val);
        setSelectedCity('');
        setSelectedSchool('');
        setFilters(prev => ({ ...prev, stateId: val, cityId: undefined, schoolId: undefined }));
    };

    const handleCityChange = (event: SelectChangeEvent<number>) => {
        const val = Number(event.target.value);
        setSelectedCity(val);
        setSelectedSchool('');
        setFilters(prev => ({ ...prev, cityId: val, schoolId: undefined }));
    };

    const handleSchoolChange = (event: SelectChangeEvent<number>) => {
        const val = Number(event.target.value);
        setSelectedSchool(val);
        setFilters(prev => ({ ...prev, schoolId: val }));
    };

    const handleClearFilters = () => {
        setSearchTerm('');
        setSelectedCountry('');
        setSelectedState('');
        setSelectedCity('');
        setSelectedSchool('');
        setFilters({});
    };
    // logica de paginacion 
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Crear un mapa para la busqueda rapida de escuelas
    const schoolMap = useMemo(() => {
        const map = new Map<number, string>();
        allSchools.forEach(s => map.set(s.id, s.name));
        return map;
    }, [allSchools]);

    const displayedTeachers = teachers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const handleTeacherClick = (teacher: Teacher) => {
        navigate(`/teachers/${teacher.id}`);
    };

    const handleSortChange = (event: SelectChangeEvent<number>) => {
        const val = Number(event.target.value);
        setSelectedSort(val);
        setFilters(prev => ({ ...prev, sort: val }));
    };

    return (
        <MainCard title="Listado de Profesores">
            <CardContent>
                <Grid container spacing={2} sx={{ mb: 3 }}>
                    {/* Search */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <TextField
                            fullWidth
                            label="Buscar por nombre"
                            variant="outlined"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>

                    {/* Filters */}
                    <Grid size={{ xs: 12, md: 2 }}>
                        <FormControl fullWidth>
                            <InputLabel id="country-label">País</InputLabel>
                            <Select
                                labelId="country-label"
                                value={selectedCountry}
                                label="País"
                                onChange={handleCountryChange}
                            >
                                {countries.map((c) => (
                                    <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    {selectedCountry && (
                        <Grid size={{ xs: 12, md: 2 }}>
                            <FormControl fullWidth disabled={!selectedCountry}>
                                <InputLabel id="state-label">Estado</InputLabel>
                                <Select
                                    labelId="state-label"
                                    value={selectedState}
                                    label="Estado"
                                    onChange={handleStateChange}
                                >
                                    {states.map((s) => (
                                        <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>)}
                    {selectedState && (
                        <Grid size={{ xs: 12, md: 2 }}>
                            <FormControl fullWidth disabled={!selectedState}>
                                <InputLabel id="city-label">Ciudad</InputLabel>
                                <Select
                                    labelId="city-label"
                                    value={selectedCity}
                                    label="Ciudad"
                                    onChange={handleCityChange}
                                >
                                    {cities.map((c) => (
                                        <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>)}
                    {selectedCity && (
                        <Grid size={{ xs: 12, md: 2 }}>
                            <FormControl fullWidth disabled={!selectedCity}>
                                <InputLabel id="school-label">Escuela</InputLabel>
                                <Select
                                    labelId="school-label"
                                    value={selectedSchool}
                                    label="Escuela"
                                    onChange={handleSchoolChange}
                                >
                                    {schoolsByCity.map((s) => (
                                        <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>)}

                    <Grid sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                        <Button variant="outlined" startIcon={<ClearIcon />} onClick={handleClearFilters}>
                            Limpiar Filtros
                        </Button>
                    </Grid>
                </Grid>

                <TableContainer>
                    <Table sx={{ minWidth: 650 }}>
                        <TableBody>
                            <TableRow>
                                <TableCell variant="head">Nombre</TableCell>
                                <TableCell variant="head">Apellido</TableCell>
                                <TableCell variant="head">Fecha de Nacimiento</TableCell>
                                <TableCell variant="head">Escuela</TableCell>
                            </TableRow>
                        </TableBody>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={4} align="center">Cargando...</TableCell>
                                </TableRow>
                            ) : displayedTeachers.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} align="center">No se encontraron profesores</TableCell>
                                </TableRow>
                            ) : (
                                displayedTeachers.map((teacher: Teacher) => (
                                    <TableRow
                                        hover
                                        key={teacher.id}
                                        sx={{ cursor: 'pointer' }}
                                        onClick={() => handleTeacherClick(teacher)}
                                    >
                                        <TableCell>{teacher.firstName}</TableCell>
                                        <TableCell>{teacher.lastName}</TableCell>
                                        <TableCell>{teacher.birthDate}</TableCell>
                                        <TableCell>{schoolMap.get(teacher.schoolId) || 'Cargando...'}</TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[10, 25, 50]}
                    component="div"
                    count={teachers.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelRowsPerPage="Filas por página"
                />
            </CardContent>
        </MainCard>
    );
};

export default TeacherList;
