import { useTeacherDetail } from "hooks/useTeachers";
import { useParams } from "react-router-dom";

const TeacherView = () => {
    const { id } = useParams<{ id: string }>();
    const { teacher, loading, error } = useTeacherDetail(Number(id));
    return (
        <div>
            <h1>Detalle del profesor</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <div>
                    <h2>{teacher?.firstName}</h2>
                </div>
            )}
        </div>
    );
};

export default TeacherView;
