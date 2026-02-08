import { City } from './city';
import { State } from './state';
import { Country } from './country';
import { Course } from './course';

export interface Teacher {
    id: number;
    firstName: string;
    lastName: string;
    birthDate: string;
    schoolId: number;
}

export interface TeacherDetail extends Teacher {
    school: { id: number; name: string };
    city: City;
    state: State;
    country: Country;
    courses: Course[];
}

export interface TeacherFilters {
    countryId?: number;
    stateId?: number;
    cityId?: number;
    name?: string;
    schoolId?: number; // Client-side filtering only
}

export interface CreateTeacherPayload {
    firstName: string;
    lastName: string;
    birthDate: string;
    schoolId: number;
}