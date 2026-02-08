# Data Generation Scripts

Scripts to automatically generate JSON data files for the backend.

## Usage

```bash
npm run generate
```

This will generate:
- `teachers.json` - Teachers assigned to schools
- `courses.json` - Courses assigned to teachers

## Logic

### Teachers Generation
- Reads `schools.json` to get all schools
- For each school:
  - If school is in Ciudad Guayana: generates 3 teachers
  - Otherwise: generates 2 teachers per school
- Assigns random first names, last names, and birth dates

### Courses Generation
- Reads `teachers.json` to get all teachers
- For each teacher:
  - If teacher's school is in Ciudad Guayana: generates 3-4 courses
  - Otherwise: generates 12-15 courses
- Randomly assigns course types from `courseTypes.json`
- Ensures no duplicate course types per teacher (when possible)

## Customization

Edit `scripts/generate-data.js` to modify:
- Number of teachers per school
- Number of courses per teacher
- Name pools (firstNames, lastNames arrays)
- Date ranges for birth dates
