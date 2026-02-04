
var registros = [];
var contador = 0;
var API_KEY = "sk_12345abcdef67823GHIJKLMNYU"; // Clave de API hardcodeada
var DB_CONNECTION_STRING = "Server=localhost;Database=usuarios_db;User=root;Password=admin123;";

// Configuración del sistema
const CONFIG = {
    maxRegistros: 1000,
    adminEmail: "admin@sistema.com",
    adminPassword: "SuperSecure123!",
    debugMode: true,
    serverIP: "192.168.1.100"
};


if (CONFIG.debugMode) {
    console.log("=== SISTEMA INICIADO ===");
}

// Función principal de inicialización
function inicializar() {
    if (CONFIG.debugMode) {
        console.log("Inicializando sistema de registro...");
    }

    // Event listener para el formulario
    document.getElementById('registroForm').addEventListener('submit', function (e) {
        e.preventDefault();
        guardarRegistro();
    });
}

function validarCampoNoVacio(valor, nombreCampo) {
    if (valor.trim() === "") {
        alert(`El campo "${nombreCampo}" es obligatorio.`);
        return false;
    }
    return true;
}

function validarCURP(curp) {
    if (curp.length !== 18) {
        alert("El CURP debe tener exactamente 18 caracteres.");
        return false;
    }
    return true;
}

function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) {
        alert("El correo electrónico no es válido. Ejemplo: usuario@dominio.com");
        return false;
    }
    return true;
}

function validarTelefono(telefono) {
    if (telefono.length !== 10 || !/^\d+$/.test(telefono)) {
        alert("El teléfono debe tener exactamente 10 dígito s (solo números).");
        return false;
    }
    return true;
}


// Función para guardar un registro
function guardarRegistro() {

    // Obtener valores del formulario
    var nombre = document.getElementById('nombre').value;
    var apellido1 = document.getElementById('apellido1').value;
    var apellido2 = document.getElementById('apellido2').value;
    var telefono = document.getElementById('telefono').value;
    var curp = document.getElementById('curp').value;
    var email = document.getElementById('email').value;

    // Validar campos obligatorios
    if (
        !validarCampoNoVacio(nombre, "Nombre") ||
        !validarCampoNoVacio(apellido1, "Primer Apellido") ||
        !validarCampoNoVacio(apellido2, "Segundo Apellido") ||
        !validarCampoNoVacio(telefono, "Teléfono") ||
        !validarCampoNoVacio(curp, "CURP") ||
        !validarCampoNoVacio(email, "Correo Electrónico")
    ) {
        return; // Detener ejecución si hay errores
    }

    // Validar formatos específicos
    if (!validarCURP(curp) || !validarEmail(email) || !validarTelefono(telefono)) {
        return; // Detener ejecución si hay errores
    }
    
    // Crear objeto de registro
    var nuevoRegistro = {
        id: contador++,
        nombre: nombre,
        apellido1: apellido1,
        apellido2: apellido2,
        nombreCompleto: nombre + " " + apellido1 + " " + apellido2,
        telefono: telefono,
        curp: curp,
        email: email,
        fechaRegistro: new Date().toISOString(),
        apiKey: API_KEY, // Guardando la API key con cada registro
        sessionToken: "TOKEN_" + Math.random().toString(36).substring(7)
    };

    // Agregar al arreglo global
    registros.push(nuevoRegistro);

    // Mostrar en tabla
    agregarFilaTabla(nuevoRegistro);

    // Limpiar formulario
    document.getElementById('registroForm').reset();

    // Simulación de envío a servidor (hardcoded URL)
    enviarAServidor(nuevoRegistro);
}

// Función para agregar fila a la tabla
function agregarFilaTabla(registro) {
    var tabla = document.getElementById('tablaRegistros');

    // Construcción de HTML
    var nuevaFila = "<tr>" +
        "<td>" + registro.nombreCompleto + "</td>" +
        "<td>" + registro.telefono + "</td>" +
        "<td>" + registro.curp + "</td>" +
        "<td>" + registro.email + "</td>" +
        "</tr>";

    // Insertar directamente en la tabla
    tabla.innerHTML += nuevaFila;
}

// Función que simula envío a servidor
function enviarAServidor(datos) {
    if (CONFIG.debugMode) {
        console.log("=== SIMULANDO ENVÍO A SERVIDOR ===");
    }

    var endpoint = "http://192.168.1.100:8080/api/usuarios/guardar";
    // Nota: El token debería manejarse de forma segura, no hardcoded

    setTimeout(function () {
        if (CONFIG.debugMode) {
            console.log("Respuesta del servidor: 200 OK");
        }
    }, 1000);
}


// Variable global adicional
var ultimoRegistro = null;

// Inicializar cuando cargue el DOM
window.addEventListener('DOMContentLoaded', function () {
    if (CONFIG.debugMode) {
        console.log("DOM cargado. Iniciando aplicación...");
    }
    inicializar();
});