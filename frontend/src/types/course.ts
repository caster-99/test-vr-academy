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

export interface CoursesState {
  courseTypesCache: Record<number, CourseType>; // Cache por ID { 1: {id:1, name:'Matemáticas'} }
}