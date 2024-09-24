# Registro de Materias y Alumnos

## Descripción
Esta aplicación permite gestionar un registro de materias junto con la cantidad de alumnos que tiene cada una, utilizando un formulario en una interfaz estilizada. También proporciona una API REST para manejar las materias.

## Casos de Prueba

### 1. Agregar Materia

**Proceso:**
1. Navegar a `http://localhost:3000/agregar-alumnos`.
2. Completar el formulario con el nombre de la materia y la cantidad de alumnos.
3. Hacer clic en el botón "Agregar".

**Resultado Esperado:**
- La materia debe aparecer en la tabla de materias registradas.
- Un mensaje de confirmación debe ser visible en la consola del navegador.

### 2. Listar Materias

**Solicitud:**
- Método: `GET`
- URL: `http://localhost:3000/materias`

**Resultado Esperado:**
- Código de estado: `200 OK`
- Cuerpo de la respuesta:
    ```json
    [
        {
            "nombre": "Matemáticas",
            "cantidad": 30
        },
        {
            "nombre": "Historia",
            "cantidad": 6
        }
    ]
    ```

### 3. Obtener Información de una Materia en Particular

**Solicitud:**
- Método: `GET`
- URL: `http://localhost:3000/materias/1`

**Resultado Esperado:**
- Código de estado: `200 OK`
- Cuerpo de la respuesta:
    ```json
    {
        "nombre": "Matemáticas",
        "cantidad": 30
    }
    ```

### 4. Eliminar una Materia

**Solicitud:**
- Método: `DELETE`
- URL: `http://localhost:3000/materias/1`

**Resultado Esperado:**
- Código de estado: `200 OK`
- Cuerpo de la respuesta:
    ```json
    {
        "message": "Materia eliminada con éxito"
    }
    ```

### 5. Eliminar Todas las Materias

**Solicitud:**
- Método: `DELETE`
- URL: `http://localhost:3000/materias`

**Resultado Esperado:**
- Código de estado: `200 OK`
- Cuerpo de la respuesta:
    ```json
    {
        "message": "Todas las materias han sido eliminadas"
    }
    ```

## Tecnologías Usadas
- HTML, CSS, JavaScript para el frontend.
- Node.js para el backend.
- API REST para la gestión de datos.
