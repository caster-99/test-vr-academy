export interface CourseType {
    id: number;
    name: string;
    code: string;
}

export interface Course {
    id: number;
    courseTypeId: number;
    teacherId: number;
    teacherName?: string; // Optional as per readme response in list
    schoolName?: string;  // Optional as per readme response in list
}

export interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface PaginatedCoursesResponse {
    data: Course[];
    pagination: Pagination;
}

export interface CoursesState {
  courseTypesCache: Record<number, CourseType>;
}