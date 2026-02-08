import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/index';
import { fetchCountries } from 'store/slices/countriesSlice';
import { State } from 'types/state';
import { City } from 'types/city';
import { School } from 'types/school';
import axios from 'api/axiosConfig';

export const useCountries = () => {
    const dispatch = useAppDispatch();
    const { list, loading } = useAppSelector((state) => state.countries);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (list.length === 0 && !loading) {
            dispatch(fetchCountries())
                .unwrap()
                .catch((err) => setError(err));
        }
    }, [dispatch, list.length, loading]);

    return { countries: list, loading, error };
};

export const useStates = (countryId?: number) => {
    const [states, setStates] = useState<State[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!countryId) {
            setStates([]);
            return;
        }
        const fetchStates = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`/states?countryId=${countryId}`);
                setStates(response.data);
            } catch (err: any) {
                setError(err.response?.data?.error || 'Error al cargar estados');
                setStates([]);
            } finally {
                setLoading(false);
            }
        };
        fetchStates();
    }, [countryId]);

    return { states, loading, error };
};

export const useCities = (stateId?: number) => {
    const [cities, setCities] = useState<City[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!stateId) {
            setCities([]);
            return;
        }
        const fetchCities = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`/cities?stateId=${stateId}`);
                setCities(response.data);
            } catch (err: any) {
                setError(err.response?.data?.error || 'Error al cargar ciudades');
                setCities([]);
            } finally {
                setLoading(false);
            }
        };
        fetchCities();
    }, [stateId]);

    return { cities, loading, error };
};

export const useSchools = (cityId?: number) => {
    const [schools, setSchools] = useState<School[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSchools = async () => {
            setLoading(true);
            setError(null);
            try {
                const url = cityId ? `/schools?cityId=${cityId}` : '/schools';
                const response = await axios.get(url);
                setSchools(response.data);
            } catch (err: any) {
                setError(err.response?.data?.error || 'Error al cargar escuelas');
                setSchools([]);
            } finally {
                setLoading(false);
            }
        };
        fetchSchools();
    }, [cityId]);

    return { schools, loading, error };
};
