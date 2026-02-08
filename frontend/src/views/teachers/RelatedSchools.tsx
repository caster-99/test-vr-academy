import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { useCities, useSchools } from "hooks/useLocations";
import MainCard from "ui-component/cards/MainCard";
import Loader from "ui-component/Loader";
import SchoolIcon from "@mui/icons-material/School";

export const RelatedSchools = ({ stateId, currentSchoolId, stateName }: { stateId: number, currentSchoolId: number, stateName: string }) => {
    const { cities, loading: citiesLoading } = useCities(stateId);
    const { schools: allSchools, loading: schoolsLoading } = useSchools();

    if (citiesLoading || schoolsLoading) return <Loader />;

    const cityIds = cities.map(c => c.id);
    const relatedSchools = allSchools.filter(school =>
        cityIds.includes(school.cityId) && school.id !== currentSchoolId
    );

    if (relatedSchools.length === 0) return null;

    return (
        <MainCard title={`Otras escuelas en ${stateName}`}>
            <List dense>
                {relatedSchools.map(school => (
                    <ListItem key={school.id}>
                        <ListItemIcon><SchoolIcon fontSize="small" /></ListItemIcon>
                        <ListItemText primary={school.name} />
                    </ListItem>
                ))}
            </List>
        </MainCard>
    );
};

