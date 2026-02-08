const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

/*
Nota 💡: Esta es la unica parte que puedes modificar del Backend, es decir puedes cambiar
puntualmente el name, username, password y photo del admin si es que asi lo deseas.
 */
const SECRET_TOKEN = 'token-secreto-123';
const ADMIN_CREDENTIALS = {
    name: 'W.D. Sans',
    username: 'admin',
    password: '1234',
    photo: 'http://www.korosenai.es/wp-content/uploads/2017/12/derrotar-sans-1.jpg'
};

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token de acceso requerido' });
    }

    if (token !== SECRET_TOKEN) {
        return res.status(403).json({ error: 'Token inválido' });
    }

    next();
};

const dataPath = path.join(__dirname, 'data');

const readJSONFile = (filename) => {
    try {
        const filePath = path.join(dataPath, filename);
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading ${filename}:`, error);
        return [];
    }
};

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Usuario y contraseña son requeridos' });
    }

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        return res.json({
            token: SECRET_TOKEN,
            user: {
                username: ADMIN_CREDENTIALS.username,
                name: ADMIN_CREDENTIALS.name,
                photo: ADMIN_CREDENTIALS.photo
            }
        });
    }

    return res.status(401).json({ error: 'Credenciales inválidas' });
});

// Pista ✅: Puedes guardar esta lista en client-side para tener cache.
app.get('/api/countries', authenticateToken, (req, res) => {
    const countries = readJSONFile('countries.json');
    const { name } = req.query;

    if (name) {
        const filtered = countries.filter(country =>
            country.name.toLowerCase().includes(name.toLowerCase())
        );
        return res.json(filtered);
    }

    res.json(countries);
});

/* Limitacion ❌: NO puedes guardar esta lista en client-side, 
debes solicitarla siempre que vayas a usarla. Si se puede usar en un
useState pero no en un redux o estado global.*/
app.get('/api/states', authenticateToken, (req, res) => {
    const states = readJSONFile('states.json');
    const { countryId, name } = req.query;

    let filtered = states;

    if (countryId) {
        filtered = filtered.filter(state => state.countryId === parseInt(countryId));
    }

    if (name) {
        filtered = filtered.filter(state =>
            state.name.toLowerCase().includes(name.toLowerCase())
        );
    }

    res.json(filtered);
});

/* Limitacion ❌: NO puedes guardar esta lista en client-side, 
debes solicitarla siempre que vayas a usarla. Si se puede usar en un
useState pero no en un redux o estado global.*/
app.get('/api/cities', authenticateToken, (req, res) => {
    const cities = readJSONFile('cities.json');
    const { stateId, name } = req.query;

    let filtered = cities;

    if (stateId) {
        filtered = filtered.filter(city => city.stateId === parseInt(stateId));
    }

    if (name) {
        filtered = filtered.filter(city =>
            city.name.toLowerCase().includes(name.toLowerCase())
        );
    }

    res.json(filtered);
});

/* Limitacion ❌: NO puedes guardar esta lista en client-side, 
debes solicitarla siempre que vayas a usarla. Si se puede usar en un
useState pero no en un redux o estado global.*/
app.get('/api/schools', authenticateToken, (req, res) => {
    const schools = readJSONFile('schools.json');
    const { cityId, name } = req.query;

    let filtered = schools;


    if (cityId) {
        filtered = filtered.filter(school => school.cityId === parseInt(cityId));
    }

    /*
     if (stateId) {
         const cities = readJSONFile('cities.json');
         const city = cities.find(c => c.id === parseInt(cityId));
         const schoolWithCity = schools.map(school => ({ ...school, city }));
         filtered = schoolWithCity.find((school) => {
             return school.city.stateId === parseInt(stateId);
         })
     }
 
     ⚠️ NOTA:
     Ojala este codigo estuviera descomentado ¿verdad?.
     Pero no, tienes que hacerlo client-side, tienes que filtrar por estado y ciudad client-side.
     */

    if (name) {
        filtered = filtered.filter(school =>
            school.name.toLowerCase().includes(name.toLowerCase())
        );
    }

    res.json(filtered);
});

app.get('/api/teachers', authenticateToken, (req, res) => {
    const teachers = readJSONFile('teachers.json');
    const schools = readJSONFile('schools.json');
    const cities = readJSONFile('cities.json');
    const states = readJSONFile('states.json');

    let filtered = teachers.map(teacher => {
        const school = schools.find(s => s.id === teacher.schoolId);
        const city = school ? cities.find(c => c.id === school.cityId) : null;
        const state = city ? states.find(s => s.id === city.stateId) : null;

        return {
            ...teacher,
            cityId: city ? city.id : null,
            stateId: state ? state.id : null,
            countryId: state ? state.countryId : null
        };
    });

    const { countryId, stateId, cityId, schoolId, name } = req.query;

    if (countryId) {
        filtered = filtered.filter(teacher => teacher.countryId === parseInt(countryId));
    }

    if (stateId) {
        filtered = filtered.filter(teacher => teacher.stateId === parseInt(stateId));
    }

    if (cityId) {
        filtered = filtered.filter(teacher => teacher.cityId === parseInt(cityId));
    }

    if (name) {
        filtered = filtered.filter(teacher => {
            const fullName = `${teacher.firstName} ${teacher.lastName}`.toLowerCase();
            return fullName.includes(name.toLowerCase());
        });
    }

    /*
    if (schoolId) {
        filtered = filtered.filter(teacher => teacher.schoolId === parseInt(schoolId));
    }

    ⚠️ NOTA:
    Ojala este codigo estuviera descomentado ¿verdad?.
    Pero no, tienes que hacerlo client-side, tienes que filtrar por escuela client-side.
    */

    /*
    ⚠️ NOTA:
    ¿Paginador? El paginador de profesores también debe hacerse client-side.
    */

    const response = filtered.map(teacher => {
        const { cityId, stateId, countryId, ...teacherData } = teacher;
        return teacherData;
    });

    res.json(response);
});

app.get('/api/teachers/:id', authenticateToken, (req, res) => {
    const teachers = readJSONFile('teachers.json');
    const schools = readJSONFile('schools.json');
    const cities = readJSONFile('cities.json');
    const states = readJSONFile('states.json');
    const countries = readJSONFile('countries.json');
    const courses = readJSONFile('courses.json');
    const courseTypes = readJSONFile('courseTypes.json');

    const teacher = teachers.find(t => t.id === parseInt(req.params.id));

    if (!teacher) {
        return res.status(404).json({ error: 'Profesor no encontrado' });
    }

    const school = schools.find(s => s.id === teacher.schoolId);
    const city = school ? cities.find(c => c.id === school.cityId) : null;
    const state = city ? states.find(s => s.id === city.stateId) : null;
    const country = state ? countries.find(c => c.id === state.countryId) : null;

    const teacherCourses = courses.filter(c => c.teacherId === teacher.id);
    const coursesWithTypes = teacherCourses.map(course => {
        const courseType = courseTypes.find(ct => ct.id === course.courseTypeId);
        return {
            ...course,
            courseType: courseType || null
        };
    });

    res.json({
        ...teacher,
        school: school || null,
        city: city || null,
        state: state || null,
        country: country || null,
        courses: coursesWithTypes
    });
});

app.post('/api/teachers', authenticateToken, (req, res) => {
    const { firstName, lastName, birthDate, schoolId } = req.body;

    if (!firstName || !lastName || !birthDate || !schoolId) {
        return res.status(400).json({
            error: 'Campos requeridos faltantes: firstName, lastName, birthDate, schoolId'
        });
    }

    if (typeof firstName !== 'string' || firstName.trim().length === 0) {
        return res.status(400).json({ error: 'El nombre debe ser una cadena de texto no vacía' });
    }

    if (typeof lastName !== 'string' || lastName.trim().length === 0) {
        return res.status(400).json({ error: 'El apellido debe ser una cadena de texto no vacía' });
    }

    if (typeof birthDate !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(birthDate)) {
        return res.status(400).json({ error: 'La fecha de nacimiento debe estar en formato YYYY-MM-DD' });
    }

    if (typeof schoolId !== 'number') {
        return res.status(400).json({ error: 'El schoolId debe ser un número' });
    }

    const teachers = readJSONFile('teachers.json');

    const schools = readJSONFile('schools.json');
    const schoolExists = schools.find(s => s.id === schoolId);
    if (!schoolExists) {
        return res.status(400).json({ error: 'No existe una escuela con este schoolId' });
    }

    const maxId = teachers.length > 0 ? Math.max(...teachers.map(t => t.id)) : 0;
    const newId = maxId + 1;

    const newTeacher = {
        id: newId,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        birthDate,
        schoolId
    };

    teachers.push(newTeacher);

    try {
        const filePath = path.join(dataPath, 'teachers.json');
        fs.writeFileSync(filePath, JSON.stringify(teachers, null, 2), 'utf8');
        res.status(201).json(newTeacher);
    } catch (error) {
        console.error('Error writing teachers.json:', error);
        res.status(500).json({ error: 'Error al guardar el profesor' });
    }
});

// Pista ✅: Puedes guardar esta lista en client-side para tener cache.
app.get('/api/courseTypes/:id', authenticateToken, (req, res) => {
    const courseTypes = readJSONFile('courseTypes.json');
    const courseType = courseTypes.find(ct => ct.id === parseInt(req.params.id));

    if (!courseType) {
        return res.status(404).json({ error: 'Tipo de curso no encontrado' });
    }

    res.json(courseType);
});

app.get('/api/courses/paginated', authenticateToken, (req, res) => {
    const courses = readJSONFile('courses.json');
    const teachers = readJSONFile('teachers.json');
    const schools = readJSONFile('schools.json');
    const { teacherId, page = 1, limit = 10 } = req.query;

    let filtered = courses;

    if (teacherId) {
        filtered = filtered.filter(course => course.teacherId === parseInt(teacherId));
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;

    const paginatedCourses = filtered.slice(startIndex, endIndex).map(course => {
        const teacher = teachers.find(t => t.id === course.teacherId);
        const school = teacher ? schools.find(s => s.id === teacher.schoolId) : null;

        return {
            ...course,
            teacherName: teacher ? `${teacher.firstName} ${teacher.lastName}` : 'Unknown',
            schoolName: school ? school.name : 'Unknown'
        };
    });

    /*
    ⚠️ NOTA:
    ¿Nombre del tipo de curso? Nah, eso no te lo voy a dar tan fácil 😏.
    Vas a tener que usar el endpoint /api/courseTypes/:id para cada curso.
    */

    res.json({
        data: paginatedCourses,
        pagination: {
            page: pageNum,
            limit: limitNum,
            total: filtered.length,
            totalPages: Math.ceil(filtered.length / limitNum)
        }
    });
});

// Pista ✅: Puedes guardar esta lista en client-side para tener cache.
app.get('/api/courses/:id', authenticateToken, (req, res) => {
    const courses = readJSONFile('courses.json');
    const course = courses.find(c => c.id === parseInt(req.params.id));

    if (!course) {
        return res.status(404).json({ error: 'Curso no encontrado' });
    }

    res.json(course);
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🚀 Backend server running on http://localhost:${PORT}`);
        console.log(`📡 Available endpoints:`);
        console.log(`   POST /api/login`);
        console.log(`   GET /api/countries`);
        console.log(`   GET /api/states`);
        console.log(`   GET /api/cities`);
        console.log(`   GET /api/schools`);
        console.log(`   GET /api/teachers`);
        console.log(`   GET /api/teachers/:id`);
        console.log(`   POST /api/teachers`);
        console.log(`   GET /api/courseTypes/:id`);
        console.log(`   GET /api/courses/:id`);
        console.log(`   GET /api/courses/paginated`);
        console.log(`\n⚠️  All endpoints (except /api/login) require Authorization header: Bearer token-secreto-123`);
    });
}

module.exports = app;
