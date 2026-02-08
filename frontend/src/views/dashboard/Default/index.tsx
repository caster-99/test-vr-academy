import { useEffect, useMemo, useState } from 'react';

// material-ui
import Grid from '@mui/material/Grid';

// project imports 
import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalIncomeDarkCard from '../../../ui-component/cards/TotalIncomeDarkCard';
import { gridSpacing } from 'store/constant';

// hooks
import { useCourses } from 'hooks/useCourses';
import { useTeachers } from 'hooks/useTeachers';
import { useSchools } from 'hooks/useLocations';
import { IconBooks, IconSchool, IconUsers } from '@tabler/icons-react';
import SimpleBarChart from './SimpleBarChart';

export default function Dashboard() {
  const [isLoading, setLoading] = useState(true);

  // aqui van todos los hooks para obtener los datos usando useMemo para que no se recarguen los datos
  const { courses } = useCourses();
  const { teachers } = useTeachers();
  const { schools } = useSchools();


  // aqui van todos los useMemo para obtener los datos
  const totalCourses = useMemo(() => courses.length, [courses]);
  const totalTeachers = useMemo(() => teachers.length, [teachers]);
  const totalSchools = useMemo(() => schools.length, [schools]);


  const schoolMap = useMemo(() => {
    const map = new Map<number, string>();
    schools.forEach((school) => {
      map.set(school.id, school.name);
    });
    return map;
  }, [schools]);

  const schoolStats = useMemo(() => {
    const countsMap = new Map<number, number>();

    teachers.forEach((teacher) => {
      const currentCount = countsMap.get(teacher.schoolId) || 0;
      countsMap.set(teacher.schoolId, currentCount + 1);
    });

    return Array.from(countsMap.entries())
      .map(([id, count]) => ({
        name: schoolMap.get(id) || `Escuela #${id}`,
        value: count
      }))
      .sort((a, b) => b.value - a.value);
  }, [teachers, schoolMap]);

  const ageStats = useMemo(() => {
    const now = new Date();
    const ages = teachers.map(t => {
      const birth = new Date(t.birthDate);
      return now.getFullYear() - birth.getFullYear();
    });

    const average = ages.length ? (ages.reduce((a, b) => a + b, 0) / ages.length).toFixed(1) : 0;
    return { average, total: teachers.length };
  }, [teachers]);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid size={12}>
        <Grid container spacing={gridSpacing}>
          <Grid size={{ md: 6, xs: 12 }}>
            <TotalOrderLineChartCard isLoading={isLoading}
              title={"Cantidad de escuelas"}
              value={totalSchools}
              icon={<IconBooks fontSize="inherit" />}
              color="secondary.dark"
            />
          </Grid>
          <Grid size={{ md: 6, xs: 12 }}>
            <TotalOrderLineChartCard isLoading={isLoading}
              title={"Cantidad de cursos"}
              value={totalCourses}
              icon={<IconSchool fontSize="inherit" />}
              color="primary.main"
            />
          </Grid>
          <Grid container spacing={gridSpacing} size={{ md: 12, xs: 12 }}>
            <Grid size={{ md: 6, xs: 12 }}>
              <TotalIncomeDarkCard isLoading={isLoading}
                title={"Cantidad de profesores"}
                value={totalTeachers}
                icon={<IconUsers fontSize="inherit" />}
                color="warning.dark"
              />
            </Grid>
            <Grid size={{ md: 6, xs: 12 }}>
              <TotalIncomeDarkCard isLoading={isLoading}
                title={"Promedio de edad de los profesores"}
                value={ageStats.average as number}
                icon={<IconUsers fontSize="inherit" />}
                color="error.light"
              />
            </Grid>
          </Grid>

        </Grid>
      </Grid>
      <Grid size={12}>
        <Grid container spacing={gridSpacing}>
          <Grid size={{ xs: 12, md: 8 }}>
            <SimpleBarChart isLoading={isLoading} title="Cantidad profesores por escuela" categories={schoolStats.map((item) => item.name)} series={[{ name: 'Profesores', data: schoolStats.map((item) => item.value) }]} />

          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <PopularCard isLoading={isLoading} array={schoolStats} title="Escuelas con más profesores" />
          </Grid>
        </Grid>
      </Grid>

    </Grid>
  );
}
