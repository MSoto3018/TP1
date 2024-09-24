const http = require('http');
const url = require('url');
const fs = require('fs');

let materias = []; // Arreglo para almacenar las materias en el servidor
let nextId = 1; // Variable para asignar IDs únicos a las materias

const servidor = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const method = req.method;

    // Mostrar formulario para agregar registro
    if (method === "GET" && parsedUrl.pathname === "/agregar-alumnos") {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.readFile('TrabajoPractico.html', (err, data) => {
            if (err) {
                res.writeHead(500);
                return res.end('Error cargando el formulario.');
            }
            res.end(data);
        });
    } 
    // Manejar la solicitud POST para agregar materia
    else if (method === "POST" && parsedUrl.pathname === "/materias") {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const nuevaMateria = JSON.parse(body);
            nuevaMateria.id = nextId++; // Asignar un ID único
            materias.push(nuevaMateria); // Agregar materia al arreglo
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: "Materia agregada con éxito" }));
        });
    } 
    // Listar todas las materias
    else if (method === "GET" && parsedUrl.pathname === "/materias") {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(materias));
    } 
    // Obtener una materia en particular
    else if (method === "GET" && parsedUrl.pathname.startsWith("/materias/")) {
        const id = parseInt(parsedUrl.pathname.split("/")[2]); // Obtener el ID de la URL
        const materia = materias.find(m => m.id === id); // Buscar la materia por ID
        if (materia) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(materia));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: "Materia no encontrada" }));
        }
    } 
    // Eliminar todas las materias
    else if (method === "DELETE" && parsedUrl.pathname === "/materias") {
        materias = [];
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: "Todas las materias han sido eliminadas" }));
    } 
    // Eliminar una materia en particular
    else if (method === "DELETE" && parsedUrl.pathname.startsWith("/materias/")) {
        const id = parseInt(parsedUrl.pathname.split("/")[2]); // Obtener el ID de la URL
        const index = materias.findIndex(materia => materia.id === id); // Buscar índice por ID
        if (index !== -1) {
            materias.splice(index, 1); // Eliminar la materia por índice
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: "Materia eliminada con éxito" }));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: "Materia no encontrada" }));
        }
    } 
    // Ruta no encontrada
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: "Ruta no encontrada" }));
    }
});

servidor.listen(3000, () => {
    console.log("Servidor ejecutándose en el puerto 3000");
});
