# Prueba Técnica - Frontend Developer (React) - Luisa Lopez

Este repositorio contiene la solución a la prueba técnica para el rol de Frontend Developer. La aplicación es un panel administrativo para la gestión de profesores, escuelas y cursos, desarrollado con React y TypeScript, basado en la plantilla Berry.

## Instalación y Ejecución

Para ejecutar el proyecto localmente, necesitarás tener instalado Node.js (v14+).

### 1. Backend
El backend está ubicado en la carpeta `backend/`. Es necesario iniciarlo primero.

```bash
cd backend
npm install
npm start
```
El servidor correrá en `http://localhost:3001`. Se mantuvo esta carpeta solo para rapidez al probar este proyecto. 

### 2. Frontend
Está ubicado en la carpeta `frontend/`. Abrir la terminal del proyecto raiz y pegar: 

```bash
cd frontend
npm install
npm start
```
La aplicación se abrirá automáticamente en `http://localhost:3000` y se redirigirá al login si el usuario no está logueado, sino al dashboard.

---

## Tecnologías Utilizadas

El proyecto fue construido utilizando el siguiente stack tecnológico:

- **Core**: React 18, TypeScript
- **Estado Global**: Redux Toolkit (Limitado según requerimientos)
- **Enrutamiento**: React Router DOM (v6)
- **UI Framework**: Material-UI (MUI)
- **Formularios**: Formik + Yup
- **Peticiones HTTP**: Axios
- **Gráficos**: ApexCharts (incluidos en la plantilla)
- **Iconos**: Tabler Icons

---

## Funcionalidades Implementadas

### Autenticación 
- Sistema completo de Login con validaciones (Formik + Yup).
- Persistencia de sesión (Token y datos de usuario).
- Protección de rutas privadas (Guardias de navegación).
- Manejo de cierre de sesión.

### Gestión de Profesores  
- **Listado Avanzado**: Tabla interactiva con paginación en el cliente. Aquí se agrego un sorting tambien del lado del cliente usando funciones basicas ubicadas en la carpeta utils, lo que permite usar el mismo mecanismo de sorting en otras tablas si es deseado en el futuro.
- **Búsqueda en Tiempo Real**: Input con *debounce* para filtrar profesores por nombre.
- **Filtros en Cascada**: Selectores dependientes para País → Estado → Ciudad → Escuela.
- **Diseño Responsive**: Adaptable a dispositivos móviles.

### Gestión de Cursos 
- **Paginación Server-Side**: Integración con endpoint paginado del backend.
- **Filtrado por Profesor**: Visualización de materias impartidas por un profesor específico.

### Detalle y Creación 
- **Vista Detallada**: Perfil completo del profesor, mostrando su escuela y materias asignadas.
- **Bonus**: Visualización de otras escuelas en el mismo estado.
- **Formulario de Creación**: Registro de nuevos profesores con validaciones en tiempo real y selectores dinámicos. Usando Formik y Yup.

---

## Decisiones Técnicas

### Gestión de Estado
Siguiendo las restricciones de la prueba técnica, se dividió la gestión del estado de la siguiente manera:
- **Redux**: Utilizado únicamente para datos globales estáticos (`Countries`) y la sesión del usuario (`Auth`).
- **Estado Local / Hooks**: Datos dinámicos como `States`, `Cities`, `Schools`, `Teachers` y `Courses` se gestionan localmente en los componentes o mediante Custom Hooks para asegurar que siempre se obtenga la data más fresca del servidor al aplicar filtros.
Tambien se incluyó un bonus que es la creación de un dashboard con gráficos y estadísticas, usando useMemo y los datos obtenidos del backend.

### Arquitectura
- Se adoptó una estructura modular basada en componentes reutilizables.
- Se implementaron **Custom Hooks** (`useTeachers`, `useLocations`, `useCourses`) para abstraer la lógica de negocio y las llamadas a la API.
- Uso de **TypeScript Strict Mode** para garantizar la integridad de los datos y evitar errores en tiempo de ejecución.

### UI/UX
- Se utilizó **Skeleton Loading** para mejorar la experiencia de usuario durante la carga de datos. Ademas de Alerts de MUI para mostrar mensajes de error.
- Diseño consistente y profesional utilizando el sistema de diseño de Material-UI.

---

## Notas para el Evaluador
- Las credenciales de acceso se encuentran en el README de la carpeta `backend/`, estas no se cambiaron, solo el archivo teachers.json ya que se estaba probando la creacion de profesores.
- El proyecto cumple con todos los puntos obligatorios y algunos de los bonus sugeridos (Validaciones completas, TypeScript estricto, UI mejorada).

---
