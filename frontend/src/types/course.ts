export interface Course {
    id: number;
    courseTypeId: number;
    teacherId: number;
}

export interface CourseType {
    id: number;
    name: string;
    code: string;
}