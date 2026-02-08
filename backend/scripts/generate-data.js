const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data');

const readJSONFile = (filename) => {
    const filePath = path.join(dataPath, filename);
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
};

const writeJSONFile = (filename, data) => {
    const filePath = path.join(dataPath, filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`✅ Generated ${filename} with ${data.length} items`);
};

const firstNames = [
    'María', 'Carlos', 'Ana', 'Luis', 'Patricia', 'Roberto', 'Carmen', 'Fernando',
    'Laura', 'Diego', 'Sofía', 'Andrés', 'Isabel', 'Javier', 'Valentina', 'Juan',
    'Gabriela', 'Ricardo', 'Monica', 'Alejandro', 'Daniela', 'Miguel', 'Paola',
    'Sergio', 'Natalia', 'David', 'Andrea', 'Francisco', 'Camila', 'Rodrigo'
];

const lastNames = [
    'González', 'Rodríguez', 'Martínez', 'Hernández', 'López', 'Sánchez', 'Ramírez',
    'Torres', 'Jiménez', 'Morales', 'Castro', 'Vargas', 'Moreno', 'Gutiérrez', 'Ruiz',
    'Díaz', 'Pérez', 'García', 'Fernández', 'Gómez', 'Álvarez', 'Romero', 'Suárez',
    'Mendoza', 'Ortega', 'Delgado', 'Vega', 'Ramos', 'Medina', 'Herrera'
];

const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];

const generateRandomDate = (startYear = 1970, endYear = 1995) => {
    const year = Math.floor(Math.random() * (endYear - startYear + 1)) + startYear;
    const month = Math.floor(Math.random() * 12) + 1;
    const day = Math.floor(Math.random() * 28) + 1;
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
};

const generateTeachers = () => {
    const schools = readJSONFile('schools.json');
    const teachers = [];
    let teacherId = 1;

    schools.forEach((school) => {
        const cityId = school.cityId;
        const cities = readJSONFile('cities.json');
        const city = cities.find(c => c.id === cityId);

        const isCiudadGuayana = city && city.name === 'Ciudad Guayana';
        const teachersPerSchool = isCiudadGuayana ? 5 : 2;

        for (let i = 0; i < teachersPerSchool; i++) {
            teachers.push({
                id: teacherId++,
                firstName: getRandomElement(firstNames),
                lastName: getRandomElement(lastNames),
                birthDate: generateRandomDate(),
                schoolId: school.id
            });
        }
    });

    return teachers;
};

const generateCourses = () => {
    const teachers = readJSONFile('teachers.json');
    const schools = readJSONFile('schools.json');
    const cities = readJSONFile('cities.json');
    const courseTypes = readJSONFile('courseTypes.json');

    const courses = [];
    let courseId = 1;

    teachers.forEach((teacher) => {
        const school = schools.find(s => s.id === teacher.schoolId);
        if (!school) return;

        const city = cities.find(c => c.id === school.cityId);
        const isCiudadGuayana = city && city.name === 'Ciudad Guayana';

        const coursesPerTeacher = isCiudadGuayana
            ? Math.floor(Math.random() * 4) + 12
            : Math.floor(Math.random() * 2) + 2;

        const usedCourseTypes = new Set();

        for (let i = 0; i < coursesPerTeacher; i++) {
            let courseTypeId;
            do {
                courseTypeId = Math.floor(Math.random() * courseTypes.length) + 1;
            } while (usedCourseTypes.has(courseTypeId) && usedCourseTypes.size < courseTypes.length);

            usedCourseTypes.add(courseTypeId);

            courses.push({
                id: courseId++,
                courseTypeId: courseTypeId,
                teacherId: teacher.id
            });
        }
    });

    return courses;
};

const main = () => {
    console.log('🚀 Starting data generation...\n');
    console.log('🧹 Cleaning existing JSON files...\n');

    console.log('📝 Generating teachers...');
    const teachers = generateTeachers();
    writeJSONFile('teachers.json', teachers);

    console.log('\n📚 Generating courses...');
    const courses = generateCourses();
    writeJSONFile('courses.json', courses);

    console.log('\n✅ Data generation completed!');
    console.log(`   - ${teachers.length} teachers generated`);
    console.log(`   - ${courses.length} courses generated`);

    const schools = readJSONFile('schools.json');
    const cities = readJSONFile('cities.json');
    const ciudadGuayanaTeachers = teachers.filter(teacher => {
        const school = schools.find(s => s.id === teacher.schoolId);
        if (!school) return false;
        const city = cities.find(c => c.id === school.cityId);
        return city && city.name === 'Ciudad Guayana';
    });

    console.log(`\n📊 Statistics:`);
    console.log(`   - Teachers in Ciudad Guayana: ${ciudadGuayanaTeachers.length}`);
    console.log(`   - Courses per teacher in Ciudad Guayana: 12-15`);
    console.log(`   - Courses per teacher in other cities: 2-3`);
};

if (require.main === module) {
    main();
}

module.exports = { generateTeachers, generateCourses };
