const request = require('supertest');
const app = require('../server');
const fs = require('fs');
const path = require('path');

const SECRET_TOKEN = 'token-secreto-123';
const dataPath = path.join(__dirname, '../data');

const readJSONFile = (filename) => {
    const filePath = path.join(dataPath, filename);
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
};

describe('API Endpoints Tests', () => {
    let authToken;

    beforeAll(async () => {
        const loginResponse = await request(app)
            .post('/api/login')
            .send({
                username: 'admin',
                password: '1234'
            });

        authToken = loginResponse.body.token;
    });

    describe('POST /api/login', () => {
        test('should login successfully with valid credentials', async () => {
            const response = await request(app)
                .post('/api/login')
                .send({
                    username: 'admin',
                    password: '1234'
                });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('token');
            expect(response.body).toHaveProperty('user');
            expect(response.body.user).toHaveProperty('username');
            expect(response.body.user).toHaveProperty('name');
            expect(response.body.user).toHaveProperty('photo');
        });

        test('should return 400 when username is missing', async () => {
            const response = await request(app)
                .post('/api/login')
                .send({
                    password: '1234'
                });

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error');
        });

        test('should return 400 when password is missing', async () => {
            const response = await request(app)
                .post('/api/login')
                .send({
                    username: 'admin'
                });

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error');
        });

        test('should return 401 with invalid credentials', async () => {
            const response = await request(app)
                .post('/api/login')
                .send({
                    username: 'admin',
                    password: 'wrongpassword'
                });

            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty('error');
        });
    });

    describe('GET /api/countries', () => {
        test('should return all countries with valid token', async () => {
            const response = await request(app)
                .get('/api/countries')
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);
            expect(response.body[0]).toHaveProperty('id');
            expect(response.body[0]).toHaveProperty('name');
            expect(response.body[0]).toHaveProperty('code');
        });

        test('should filter countries by name', async () => {
            const response = await request(app)
                .get('/api/countries?name=venezuela')
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            response.body.forEach(country => {
                expect(country.name.toLowerCase()).toContain('venezuela');
            });
        });

        test('should return 401 without token', async () => {
            const response = await request(app)
                .get('/api/countries');

            expect(response.status).toBe(401);
        });
    });

    describe('GET /api/states', () => {
        test('should return all states with valid token', async () => {
            const response = await request(app)
                .get('/api/states')
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);
            expect(response.body[0]).toHaveProperty('id');
            expect(response.body[0]).toHaveProperty('name');
            expect(response.body[0]).toHaveProperty('countryId');
            expect(response.body[0]).toHaveProperty('code');
        });

        test('should filter states by countryId', async () => {
            const countries = readJSONFile('countries.json');
            const countryId = countries[0].id;

            const response = await request(app)
                .get(`/api/states?countryId=${countryId}`)
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            response.body.forEach(state => {
                expect(state.countryId).toBe(countryId);
            });
        });

        test('should filter states by name', async () => {
            const response = await request(app)
                .get('/api/states?name=miranda')
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            response.body.forEach(state => {
                expect(state.name.toLowerCase()).toContain('miranda');
            });
        });

        test('should return 401 without token', async () => {
            const response = await request(app)
                .get('/api/states');

            expect(response.status).toBe(401);
        });
    });

    describe('GET /api/cities', () => {
        test('should return all cities with valid token', async () => {
            const response = await request(app)
                .get('/api/cities')
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);
            expect(response.body[0]).toHaveProperty('id');
            expect(response.body[0]).toHaveProperty('name');
            expect(response.body[0]).toHaveProperty('stateId');
        });

        test('should filter cities by stateId', async () => {
            const states = readJSONFile('states.json');
            const stateId = states[0].id;

            const response = await request(app)
                .get(`/api/cities?stateId=${stateId}`)
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            response.body.forEach(city => {
                expect(city.stateId).toBe(stateId);
            });
        });

        test('should filter cities by name', async () => {
            const response = await request(app)
                .get('/api/cities?name=caracas')
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            response.body.forEach(city => {
                expect(city.name.toLowerCase()).toContain('caracas');
            });
        });

        test('should return 401 without token', async () => {
            const response = await request(app)
                .get('/api/cities');

            expect(response.status).toBe(401);
        });
    });

    describe('GET /api/schools', () => {
        test('should return all schools with valid token', async () => {
            const response = await request(app)
                .get('/api/schools')
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);
            expect(response.body[0]).toHaveProperty('id');
            expect(response.body[0]).toHaveProperty('name');
            expect(response.body[0]).toHaveProperty('cityId');
        });

        test('should filter schools by cityId', async () => {
            const cities = readJSONFile('cities.json');
            const cityId = cities[0].id;

            const response = await request(app)
                .get(`/api/schools?cityId=${cityId}`)
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            response.body.forEach(school => {
                expect(school.cityId).toBe(cityId);
            });
        });

        test('should filter schools by name', async () => {
            const response = await request(app)
                .get('/api/schools?name=escuela')
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            response.body.forEach(school => {
                expect(school.name.toLowerCase()).toContain('escuela');
            });
        });

        test('should return 401 without token', async () => {
            const response = await request(app)
                .get('/api/schools');

            expect(response.status).toBe(401);
        });
    });

    describe('GET /api/teachers', () => {
        test('should return all teachers with valid token', async () => {
            const response = await request(app)
                .get('/api/teachers')
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);
            expect(response.body[0]).toHaveProperty('id');
            expect(response.body[0]).toHaveProperty('firstName');
            expect(response.body[0]).toHaveProperty('lastName');
            expect(response.body[0]).toHaveProperty('birthDate');
            expect(response.body[0]).toHaveProperty('schoolId');
            expect(response.body[0]).not.toHaveProperty('cityId');
            expect(response.body[0]).not.toHaveProperty('stateId');
            expect(response.body[0]).not.toHaveProperty('countryId');
        });

        test('should filter teachers by countryId', async () => {
            const countries = readJSONFile('countries.json');
            const countryId = countries[0].id;

            const response = await request(app)
                .get(`/api/teachers?countryId=${countryId}`)
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);
        });

        test('should filter teachers by stateId', async () => {
            const states = readJSONFile('states.json');
            const stateId = states[0].id;

            const response = await request(app)
                .get(`/api/teachers?stateId=${stateId}`)
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);
        });

        test('should filter teachers by cityId', async () => {
            const cities = readJSONFile('cities.json');
            const cityId = cities[0].id;

            const response = await request(app)
                .get(`/api/teachers?cityId=${cityId}`)
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);
        });

        test('should filter teachers by name', async () => {
            const teachers = readJSONFile('teachers.json');
            const firstTeacher = teachers[0];
            const searchName = firstTeacher.firstName.substring(0, 3);

            const response = await request(app)
                .get(`/api/teachers?name=${searchName}`)
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            response.body.forEach(teacher => {
                const fullName = `${teacher.firstName} ${teacher.lastName}`.toLowerCase();
                expect(fullName).toContain(searchName.toLowerCase());
            });
        });

        test('should return 401 without token', async () => {
            const response = await request(app)
                .get('/api/teachers');

            expect(response.status).toBe(401);
        });
    });

    describe('GET /api/teachers/:id', () => {
        test('should return teacher details with related data', async () => {
            const teachers = readJSONFile('teachers.json');
            const teacherId = teachers[0].id;

            const response = await request(app)
                .get(`/api/teachers/${teacherId}`)
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('id');
            expect(response.body).toHaveProperty('firstName');
            expect(response.body).toHaveProperty('lastName');
            expect(response.body).toHaveProperty('birthDate');
            expect(response.body).toHaveProperty('schoolId');
            expect(response.body).toHaveProperty('school');
            expect(response.body).toHaveProperty('city');
            expect(response.body).toHaveProperty('state');
            expect(response.body).toHaveProperty('country');
            expect(response.body).toHaveProperty('courses');
            expect(Array.isArray(response.body.courses)).toBe(true);
        });

        test('should return 404 for non-existent teacher', async () => {
            const response = await request(app)
                .get('/api/teachers/99999')
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty('error');
        });

        test('should return 401 without token', async () => {
            const response = await request(app)
                .get('/api/teachers/1');

            expect(response.status).toBe(401);
        });
    });

    describe('POST /api/teachers', () => {
        let originalTeachers;
        let maxId;

        beforeAll(() => {
            originalTeachers = readJSONFile('teachers.json');
            maxId = Math.max(...originalTeachers.map(t => t.id));
        });

        afterAll(() => {
            const filePath = path.join(dataPath, 'teachers.json');
            fs.writeFileSync(filePath, JSON.stringify(originalTeachers, null, 2), 'utf8');
        });

        test('should create a new teacher successfully with auto-generated id', async () => {
            const teachers = readJSONFile('teachers.json');
            const maxId = teachers.length > 0 ? Math.max(...teachers.map(t => t.id)) : 0;
            const schools = readJSONFile('schools.json');
            const newTeacher = {
                firstName: 'Test',
                lastName: 'Teacher',
                birthDate: '1990-01-01',
                schoolId: schools[0].id
            };

            const response = await request(app)
                .post('/api/teachers')
                .set('Authorization', `Bearer ${authToken}`)
                .send(newTeacher);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('id', maxId + 1);
            expect(response.body).toHaveProperty('firstName', newTeacher.firstName);
            expect(response.body).toHaveProperty('lastName', newTeacher.lastName);
            expect(response.body).toHaveProperty('birthDate', newTeacher.birthDate);
            expect(response.body).toHaveProperty('schoolId', newTeacher.schoolId);
        });


        test('should return 400 when firstName is missing', async () => {
            const schools = readJSONFile('schools.json');
            const response = await request(app)
                .post('/api/teachers')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    lastName: 'Teacher',
                    birthDate: '1990-01-01',
                    schoolId: schools[0].id
                });

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error');
        });

        test('should return 400 when firstName is empty', async () => {
            const schools = readJSONFile('schools.json');
            const response = await request(app)
                .post('/api/teachers')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    firstName: '   ',
                    lastName: 'Teacher',
                    birthDate: '1990-01-01',
                    schoolId: schools[0].id
                });

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error');
        });

        test('should return 400 when birthDate format is invalid', async () => {
            const schools = readJSONFile('schools.json');
            const response = await request(app)
                .post('/api/teachers')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    firstName: 'Test',
                    lastName: 'Teacher',
                    birthDate: '01-01-1990',
                    schoolId: schools[0].id
                });

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error');
        });

        test('should return 400 when schoolId does not exist', async () => {
            const response = await request(app)
                .post('/api/teachers')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    firstName: 'Test',
                    lastName: 'Teacher',
                    birthDate: '1990-01-01',
                    schoolId: 99999
                });

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error');
        });


        test('should return 401 without token', async () => {
            const response = await request(app)
                .post('/api/teachers')
                .send({
                    firstName: 'Test',
                    lastName: 'Teacher',
                    birthDate: '1990-01-01',
                    schoolId: 1
                });

            expect(response.status).toBe(401);
        });
    });

    describe('GET /api/courseTypes/:id', () => {
        test('should return course type by id', async () => {
            const courseTypes = readJSONFile('courseTypes.json');
            const courseTypeId = courseTypes[0].id;

            const response = await request(app)
                .get(`/api/courseTypes/${courseTypeId}`)
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('id', courseTypeId);
            expect(response.body).toHaveProperty('name');
            expect(response.body).toHaveProperty('code');
        });

        test('should return 404 for non-existent course type', async () => {
            const response = await request(app)
                .get('/api/courseTypes/99999')
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty('error');
        });

        test('should return 401 without token', async () => {
            const response = await request(app)
                .get('/api/courseTypes/1');

            expect(response.status).toBe(401);
        });
    });

    describe('GET /api/courses/:id', () => {
        test('should return course by id', async () => {
            const courses = readJSONFile('courses.json');
            const courseId = courses[0].id;

            const response = await request(app)
                .get(`/api/courses/${courseId}`)
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('id', courseId);
            expect(response.body).toHaveProperty('courseTypeId');
            expect(response.body).toHaveProperty('teacherId');
        });

        test('should return 404 for non-existent course', async () => {
            const response = await request(app)
                .get('/api/courses/99999')
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty('error');
        });

        test('should return 401 without token', async () => {
            const response = await request(app)
                .get('/api/courses/1');

            expect(response.status).toBe(401);
        });
    });

    describe('GET /api/courses/paginated', () => {
        test('should return paginated courses with teacher and school names', async () => {
            const response = await request(app)
                .get('/api/courses/paginated?page=1&limit=10')
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('data');
            expect(response.body).toHaveProperty('pagination');
            expect(Array.isArray(response.body.data)).toBe(true);
            expect(response.body.pagination).toHaveProperty('page', 1);
            expect(response.body.pagination).toHaveProperty('limit', 10);
            expect(response.body.pagination).toHaveProperty('total');
            expect(response.body.pagination).toHaveProperty('totalPages');

            if (response.body.data.length > 0) {
                expect(response.body.data[0]).toHaveProperty('teacherName');
                expect(response.body.data[0]).toHaveProperty('schoolName');
                expect(response.body.data[0]).toHaveProperty('courseTypeId');
            }
        });

        test('should use default pagination values', async () => {
            const response = await request(app)
                .get('/api/courses/paginated')
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(200);
            expect(response.body.pagination).toHaveProperty('page', 1);
            expect(response.body.pagination).toHaveProperty('limit', 10);
        });

        test('should filter courses by teacherId', async () => {
            const teachers = readJSONFile('teachers.json');
            const teacherId = teachers[0].id;

            const response = await request(app)
                .get(`/api/courses/paginated?teacherId=${teacherId}`)
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(200);
            expect(response.body.data.length).toBeLessThanOrEqual(10);
            response.body.data.forEach(course => {
                expect(course.teacherId).toBe(teacherId);
            });
        });

        test('should handle pagination correctly', async () => {
            const response1 = await request(app)
                .get('/api/courses/paginated?page=1&limit=5')
                .set('Authorization', `Bearer ${authToken}`);

            const response2 = await request(app)
                .get('/api/courses/paginated?page=2&limit=5')
                .set('Authorization', `Bearer ${authToken}`);

            expect(response1.status).toBe(200);
            expect(response2.status).toBe(200);
            expect(response1.body.data.length).toBeLessThanOrEqual(5);
            expect(response2.body.data.length).toBeLessThanOrEqual(5);
            expect(response1.body.data[0].id).not.toBe(response2.body.data[0].id);
        });

        test('should return 401 without token', async () => {
            const response = await request(app)
                .get('/api/courses/paginated');

            expect(response.status).toBe(401);
        });
    });
});
