# Express.js-API-and-Postman-Tests

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/2a12e1425ed0443c8cb7fa3e86cca9b2)](https://app.codacy.com/gh/Joaco981/Express.js-API-and-Postman-Tests/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

Sistema de Notificaciones UCP - Una aplicación web full-stack para gestionar notificaciones de mesas de examen y enviar invitaciones a profesores.

## Características

- Backend API REST con Express.js
- Frontend con Vue.js 3
- Sistema de autenticación
- Notificaciones por email
- Notificaciones push al escritorio
- Gestión de mesas de examen
- Gestión de invitaciones
- Tests automatizados con Jest
- PWA (Progressive Web App)

## Requisitos Previos

- Node.js (versión 14 o superior)
- npm (incluido con Node.js)
- Git
- Un cliente SMTP para el envío de emails (configurable en .env)

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/Joaco981/Express.js-API-and-Postman-Tests.git
cd Express.js-API-and-Postman-Tests
```

2. Instalar dependencias del backend:
```bash
npm install
```

3. Instalar dependencias del frontend:
```bash
cd frontend
npm install
cd ..
```

4. Configurar variables de entorno:
   - Crear un archivo `.env` en la raíz del proyecto
   - Agregar las siguientes variables (ajustar según tu configuración):
```env
SMTP_HOST=tu_servidor_smtp
SMTP_PORT=587
SMTP_USER=tu_email
SMTP_PASS=tu_contraseña
```

## Ejecución

### Backend

1. Iniciar el servidor de desarrollo:
```bash
node backend/app.js
```
El servidor se iniciará en `http://localhost:3000`

### Frontend

1. En una nueva terminal, desde la carpeta `frontend`:
```bash
npm run dev
```
La aplicación frontend estará disponible en `http://localhost:5173`

## Testing

Para ejecutar los tests:
```bash
npm test
```

Para ver la cobertura de tests:
```bash
npm run coverage
```

## Credenciales de Acceso

El sistema incluye usuarios predefinidos para pruebas:
- Usuario: Jose, Contraseña: 1234
- Usuario: Gilda, Contraseña: abcd
- Usuario: Carlos, Contraseña: 1111
- Usuario: Figue, Contraseña: 2222

## Estructura del Proyecto

```
├── backend/
│   ├── app.js              # Punto de entrada del servidor
│   ├── data/              # Datos estáticos
│   ├── models/            # Modelos de datos
│   ├── service/           # Servicios (email, notificaciones)
│   └── test/              # Tests del backend
├── frontend/
│   ├── src/               # Código fuente Vue.js
│   ├── public/            # Archivos estáticos
│   └── package.json       # Dependencias del frontend
└── package.json           # Dependencias del backend
```

## API Endpoints

- `GET /` - Página de bienvenida
- `POST /api/auth/login` - Autenticación de usuarios
- `GET /api/mesas` - Obtener todas las mesas
- `GET /api/invitaciones` - Obtener todas las invitaciones

## Contribución

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia ISC.

## Soporte

Si encuentras algún problema o tienes alguna sugerencia, por favor abre un issue en el repositorio.
