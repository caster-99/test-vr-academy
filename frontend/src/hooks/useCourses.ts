import { useState, useEffect, useCallback } from 'react';
import axios from 'api/axiosConfig';
import { Course, CourseType, PaginatedCoursesResponse, Pagination } from 'types/course';
import { useAppDispatch, useAppSelector } from 'store/index';
import { fetchCourseTypeById } from 'store/slices/coursesSlice';

export const useCourses = (initialPage = 1, initialLimit = 10, teacherId?: number) => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [pagination, setPagination] = useState<Pagination>({ page: initialPage, limit: initialLimit, total: 0, totalPages: 0 });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [page, setPage] = useState(initialPage);
    const [limit, setLimit] = useState(initialLimit);

    const fetchCourses = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const params = new URLSearchParams();
            params.append('page', page.toString());
            params.append('limit', limit.toString());
            if (teacherId) params.append('teacherId', teacherId.toString());

            const response = await axios.get<PaginatedCoursesResponse>(`/courses/paginated?${params.toString()}`);
            setCourses(response.data.data);
            setPagination(response.data.pagination);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Error al cargar cursos');
        } finally {
            setLoading(false);
        }
    }, [page, limit, teacherId]);

    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

    return { courses, pagination, loading, error, setPage, setLimit, refresh: fetchCourses };
};

export const useCourseType = (id: number) => {
    const dispatch = useAppDispatch();
    const courseType = useAppSelector(state => state.courses.courseTypesCache[id]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!courseType && id) {
             setLoading(true);
             dispatch(fetchCourseTypeById(id))
                .unwrap()
                .catch((err) => setError(err))
                .finally(() => setLoading(false));
        }
    }, [dispatch, id, courseType]);

    return { courseType, loading, error };
};
