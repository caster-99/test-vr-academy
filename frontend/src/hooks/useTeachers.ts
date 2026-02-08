import { useState, useEffect, useCallback } from 'react';
import axios from 'api/axiosConfig';
import { Teacher, TeacherDetail, TeacherFilters, CreateTeacherPayload } from 'types/teacher';

export const useTeachers = (initialFilters?: TeacherFilters) => {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState<TeacherFilters>(initialFilters || {});

    const fetchTeachers = useCallback(async (currentFilters: TeacherFilters) => {
        setLoading(true);
        setError(null);
        try { 
            const params = new URLSearchParams();
            if (currentFilters.countryId) params.append('countryId', currentFilters.countryId.toString());
            if (currentFilters.stateId) params.append('stateId', currentFilters.stateId.toString());
            if (currentFilters.cityId) params.append('cityId', currentFilters.cityId.toString());
            if (currentFilters.name) params.append('name', currentFilters.name);
            
            const response = await axios.get(`/teachers?${params.toString()}`);
            let data: Teacher[] = response.data;

            // Client-side filtering for schoolId
            if (currentFilters.schoolId) {
                data = data.filter(t => t.schoolId === currentFilters.schoolId);
            }

            setTeachers(data);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Error al cargar profesores');
            setTeachers([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTeachers(filters);
    }, [filters, fetchTeachers]);

    const createTeacher = async (payload: CreateTeacherPayload) => {
        setLoading(true);
        try {
            const response = await axios.post('/teachers', payload);
            setTeachers(prev => [...prev, response.data]);
            return response.data;
        } catch (err: any) {
            const msg = err.response?.data?.error || 'Error al crear profesor';
            setError(msg);
            throw new Error(msg);
        } finally {
            setLoading(false);
        }
    };

    return { teachers, loading, error, filters, setFilters, refresh: () => fetchTeachers(filters), createTeacher };
};

export const useTeacherDetail = (id: number | null) => {
    const [teacher, setTeacher] = useState<TeacherDetail | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) {
            setTeacher(null);
            return;
        }
        const fetchTeacher = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`/teachers/${id}`);
                setTeacher(response.data);
            } catch (err: any) {
                setError(err.response?.data?.error || 'Error al cargar detalles del profesor');
                setTeacher(null);
            } finally {
                setLoading(false);
            }
        };
        fetchTeacher();
    }, [id]);

    return { teacher, loading, error };
};
