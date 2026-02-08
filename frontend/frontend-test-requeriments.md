# Prueba Técnica - Frontend Developer (React)

## Contexto

Desarrollar un panel administrativo para gestionar profesores, escuelas y cursos usando React y TypeScript. El sistema debe permitir visualizar, filtrar y crear profesores, además de gestionar cursos de manera eficiente.

**El sistema consta de 5 pantallas principales:**
1. Login
2. Listado de profesores (con filtros y búsqueda)
3. Listado de materias/cursos paginado
4. Creación de profesores
5. Detalle de profesor

---

## Requerimientos Técnicos

### Stack

- React 18 con TypeScript
- Plantilla pre-armada gratuita (recomendamos Berry Free React o cualquier plantilla de admin panel de tu preferencia)
- Redux Toolkit
- Formik + Yup (puedes usar otro par de librerias, pero usar estas es un bonus)
- React Router
- Axios o Fetch API

### Backend Local

Se proporciona un backend Express en la carpeta `backend/`. Ejecuta `npm install` y `npm start` en esa carpeta. El servidor corre en `http://localhost:3001`.

**Lee el `README.md` en `backend/` para conocer todos los endpoints disponibles y sus parámetros.**

---

## Parte 1: Setup y Configuración (10%)

- Instalar y configurar la plantilla elegida
- Configurar TypeScript correctamente
- Configurar Redux Toolkit
- Configurar React Router con rutas protegidas
- Limpiar código innecesario de la plantilla (recomendado hacerlo al final con ayuda de la inteligencia artificial)

---

## Parte 2: Autenticación (10%)

Implementar un sistema de login completo:

- Formulario de login usando **Formik + Yup**
- Validaciones robustas (campos requeridos, formato correcto, etc.)
- Gestión de sesión (token y datos del usuario)
- Rutas protegidas (redirigir a login si no está autenticado)
- Logout funcional
- Persistencia de sesión (opcional, pero recomendado)

**Nota:** Consulta el README del backend para conocer el endpoint de login y las credenciales.

---

## Parte 3: Listado de Profesores con Filtros y Búsqueda (30%)

Implementar un listado de profesores con las siguientes características:

### 3.1 Paginación Client-Side
- Implementar paginación completamente en el cliente
- Mostrar controles de navegación (anterior, siguiente, número de página)
- Permitir seleccionar cantidad de items por página (10, 25, 50)

### 3.2 Búsqueda por Nombre en Tiempo Real
- Implementar un campo de búsqueda que filtre profesores por nombre
- La búsqueda debe ser en tiempo real (sin botón de "Buscar")
- **Debe implementar debounce** para evitar múltiples peticiones innecesarias
- La búsqueda debe hacerse del lado del servidor

### 3.3 Filtros en Cascada
Implementar filtros que se apliquen en tiempo real (sin botón "Aplicar" o "Buscar"):

1. **Selector de País**: Al seleccionar un país, debe cargar los estados de ese país
2. **Selector de Estado**: Aparece después de seleccionar un país. Al seleccionar un estado, debe cargar las ciudades de ese estado
3. **Selector de Ciudad**: Aparece después de seleccionar un estado. Al seleccionar una ciudad, debe cargar las escuelas de esa ciudad
4. **Selector de Escuela**: Aparece después de seleccionar una ciudad

**Requisitos importantes:**
- Los filtros deben aplicarse automáticamente al seleccionar cada opción
- La lista de profesores debe actualizarse en tiempo real
- Los filtros deben funcionar en conjunto con la búsqueda por nombre
- Debe haber una opción para limpiar todos los filtros (opcional)

### 3.4 Diseño de la Tabla
- Mostrar: ID, Nombre completo
- Puedes agregar campos adicionales si lo deseas (fecha de nacimiento, etc.) pero no son evaluados
- Diseño responsive
- Cada fila debe ser clickeable para ir al detalle del profesor

---

## Parte 4: Listado de Cursos (Materias) Paginado (15%)

Implementar un listado de cursos con las siguientes características:

### 4.1 Tabla de Cursos
Mostrar una tabla con las siguientes columnas:
- **Nombre de la Materia** (nombre del tipo de curso)
- **Nombre del Profesor**
- **Nombre de la Escuela**

### 4.2 Filtro por Profesor
- Implementar un selector/dropdown para filtrar cursos por profesor
- El filtro debe aplicarse en el servidor (server-side)
- Al seleccionar un profesor, mostrar solo los cursos que imparte ese profesor

### 4.3 Paginación Server-Side
- Usar el endpoint de paginación del backend
- Mostrar controles de navegación
- Mostrar información de paginación (página actual, total de páginas, total de items)
- La paginación debe funcionar en conjunto con el filtro por profesor

**Nota:** Consulta el README del backend para conocer el endpoint de cursos paginados. Algunos datos pueden requerir peticiones adicionales.

---

## Parte 5: Vista de Detalle de Profesor (20%)

Crear una vista detallada de un profesor que se muestre al hacer clic en una fila del listado.

### 5.1 Información a Mostrar
- Nombre completo del profesor
- Fecha de nacimiento
- Escuela a la que pertenece
- Ciudad, Estado y País de la escuela
- Lista de materias que imparte (con sus nombres completos)

### 5.2 Información Adicional (BONUS)
- Mostrar lista de las otras escuelas que existen en el mismo estado del profesor

### 5.3 Diseño
- **La estética de esta vista es importante y será evaluada**
- Usa cards, grids, o cualquier diseño moderno
- Debe ser responsive
- Considera usar iconos, colores y espaciado apropiado

---

## Parte 6: Creación de Profesor (15%)

Implementar un formulario para crear un nuevo profesor.

### 6.1 Formulario
- Preferiblemente usar **Formik + Yup**
- Si prefieres otra librería de formularios, puedes usarla (pero Formik + Yup es un bonus)

### 6.2 Campos del Formulario
- Nombre (firstName)
- Apellido (lastName)
- Fecha de nacimiento (birthDate)
- Escuela (schoolId)

**Nota:** El ID del profesor se autogenera automáticamente en el backend. No es necesario incluirlo en el formulario.

### 6.3 Validaciones
- Todos los campos son requeridos
- Fecha de nacimiento debe ser válida y en formato correcto
- Mostrar mensajes de error claros
- Validación en tiempo real

### 6.4 Funcionalidad
- Al enviar el formulario, debe crear el profesor en el backend
- Mostrar mensaje de éxito o error
- Limpiar el formulario después de crear exitosamente
- Redirigir al listado o mostrar el profesor creado

**Nota:** Consulta el README del backend para conocer el endpoint de creación y sus validaciones.

---

## Formato de Entrega

- Repositorio GitHub (preferido) o archivo .zip
- **README.md** con:
  - Instrucciones de instalación
  - Instrucciones de ejecución
  - Decisiones técnicas importantes (opcional)
  - Librerías adicionales usadas y por qué (opcional)
- Código limpio y bien organizado
- Commits descriptivos (si usas Git)

---

## Criterios de Evaluación

| Criterio | Peso |
|----------|------|
| Setup, configuración y limpieza | 10% |
| Autenticación | 10% |
| Listado de profesores (paginación, búsqueda, filtros) | 30% |
| Listado de cursos paginado (con filtro por profesor) | 15% |
| Vista de detalle de profesor (diseño y funcionalidad) | 20% |
| Creación de profesor | 15% |
| **Bonus**: TypeScript bien usado, tests, código limpio, silent tests descubiertos | +10% |

---

## Tiempo de Entrega

**48 horas** desde que recibes esta prueba.

---

## Notas Importantes

- **Calidad > Cantidad**: Es mejor hacer menos funcionalidades bien hechas que muchas mal hechas
- **Lee la documentación del backend**: El README del backend tiene información importante sobre los endpoints
- **Programa como si fuera React 18 o anterior**: Usa `useEffect`, `useMemo` y `useCallback` de manera correcta. Evita llamadas innecesarias al API y ciclos infinitos en `useEffect`
- **TypeScript bien usado**: Evita usar `any` en todos lados, crea interfaces y types apropiados
- **Usa IA como herramienta**: Puedes usar Cursor, Claude, ChatGPT, etc. como herramientas de apoyo
- **Código limpio**: Sigue principios SOLID, DRY y buenas prácticas

### Notas sobre Redux Toolkit

El backend tiene comentarios que indican qué datos puedes cachear en Redux y cuáles no. **Lee los comentarios en el código del backend** para entender estas limitaciones:

**✅ Datos que PUEDES guardar en Redux (cache permitido):**
- Países (`/api/countries`)
- Autenticación (token y datos del usuario)
- Tipos de cursos (`/api/courseTypes/:id`)

**❌ Datos que NO DEBES guardar en Redux (sin cache):**
- Estados (`/api/states`)
- Ciudades (`/api/cities`)
- Escuelas (`/api/schools`)
- Profesores (`/api/teachers`)
- Cursos (`/api/courses`)

Estos datos SÍ se pueden guardar en `useState` o state local de componentes, pero NO en Redux o cualquier estado global persistente. La idea es que siempre se soliciten al backend cuando cambien los parámetros de búsqueda.

**¿Por qué esta limitación?** Es una restricción intencional del backend para evaluar cómo manejas diferentes escenarios de gestión de estado.

---

## Preguntas Frecuentes

**¿Puedo usar librerías adicionales?**
Sí, pero documenta por qué las usaste en el README.

**¿Puedo modificar el backend?**
El backend está diseñado con limitaciones intencionales y normalmente no debes modificarlo. Sin embargo, **si el backend no funciona, presenta bugs, o encuentras requerimientos IMPOSIBLES de implementar con las limitaciones impuestas, coméntalo al entrevistador**. El entrevistador te dará autorización para modificar el backend o eliminar ese requerimiento específico.

**¿Qué pasa si no termino todo?**
Prioriza las partes más importantes. Es mejor tener algunas funcionalidades completas y bien hechas.

**¿Puedo usar una plantilla diferente a Berry?**
Sí, puedes usar cualquier plantilla de admin panel gratuita que prefieras.

---

Si tienes dudas, envía tus preguntas al correo indicado en la oferta.

**¡Mucho éxito! 🚀**
