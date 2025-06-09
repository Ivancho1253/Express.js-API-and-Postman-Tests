<template>
  <div class="dashboard-page min-vh-100">
    <div class="dashboard-container">
      <!-- Header con logo y saludo -->
      <div class="dashboard-header">
        <img src="/img/logo-ucp.png" class="dashboard-logo" alt="Logo UCP">
        <h2 class="welcome-title">Bienvenido, {{ usuarioActual.nombre }}</h2>
      </div>

      <!-- Mesas de Examen -->
      <div class="section-card">
        <h3 class="section-title">
          <i class="icon">📋</i>
          Mesas de Examen
        </h3>
        
        <div v-if="mesasAsignadas.length > 0" class="mesas-grid">
          <div v-for="mesa in mesasAsignadas" :key="mesa.id" class="mesa-card">
            <div class="mesa-header">
              <h4 class="mesa-materia">{{ mesa.materia }}</h4>
              <div class="fecha-hora">
                <span class="mesa-fecha">{{ mesa.fecha }}</span>
                <span class="mesa-hora">{{ mesa.hora }}</span>
              </div>
            </div>
            
            <div class="mesa-info">
              <div class="info-row">
                <span class="info-label">Tu rol:</span>
                <span class="info-value role-badge" :class="obtenerRol(mesa)">
                  {{ obtenerRol(mesa) === 'titular' ? 'Titular' : 'Vocal' }}
                </span>
              </div>
              
              <div class="info-row">
                <span class="info-label">{{ obtenerRol(mesa) === 'titular' ? 'Vocal' : 'Titular' }}:</span>
                <span class="info-value">{{ obtenerOtroNombre(mesa) }}</span>
              </div>

              <div class="info-row">
                <span class="info-label">Modalidad:</span>
                <span class="info-value tipo-badge" :class="mesa.tipo">
                  <i class="modalidad-icon">{{ mesa.tipo === 'virtual' ? '💻' : '🏫' }}</i>
                  {{ mesa.tipo === 'virtual' ? 'Virtual' : 'Presencial' }}
                </span>
              </div>

              <div v-if="mesa.tipo === 'presencial' && mesa.aula" class="info-row">
                <span class="info-label">Aula:</span>
                <span class="info-value aula-info">
                  <i class="aula-icon">📍</i>
                  {{ mesa.aula }}
                </span>
              </div>

              <div v-if="mesa.tipo === 'virtual' && mesa.linkWebex" class="info-row">
                <span class="info-label">Webex:</span>
                <a :href="mesa.linkWebex" target="_blank" class="webex-link">
                  <i class="webex-icon">🔗</i>
                  Unirse a la mesa virtual
                </a>
              </div>
              
              <div class="info-row">
                <span class="info-label">Estado:</span>
                <span class="info-value status-badge" :class="getStatusClass(mesa)">
                  {{ calcularEstadoMesa(mesa) }}
                </span>
              </div>
            </div>
            
            <div class="alumnos-section" v-if="mesa.alumnos && mesa.alumnos.length > 0">
              <h5 class="alumnos-title">Alumnos:</h5>
              <div class="alumnos-list">
                <span v-for="alumno in mesa.alumnos" :key="alumno" class="alumno-tag">
                  {{ alumno }}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div v-else class="empty-state">
          <div class="empty-icon">📚</div>
          <p class="empty-message">No tienes mesas asignadas</p>
        </div>
      </div>

      <!-- Invitaciones -->
      <div class="section-card">
        <h3 class="section-title">
          <i class="icon">✉️</i>
          Invitaciones
        </h3>
        
        <div v-if="invitaciones.length > 0" class="invitaciones-grid">
          <div v-for="inv in invitaciones" :key="inv.mesa.id" class="invitacion-card">
            <div class="invitacion-header">
              <h4 class="invitacion-materia">{{ inv.mesa.materia }}</h4>
              <div class="fecha-hora">
                <span class="invitacion-fecha">{{ inv.mesa.fecha }}</span>
                <span class="invitacion-hora">{{ inv.mesa.hora }}</span>
              </div>
            </div>
            
            <div class="invitacion-info">
              <div class="info-row">
                <span class="info-label">Tu rol propuesto:</span>
                <span class="info-value role-badge" :class="inv.mesa.titular.nombre === usuarioActual.nombre ? 'titular' : 'vocal'">
                  {{ inv.mesa.titular.nombre === usuarioActual.nombre ? 'Titular' : 'Vocal' }}
                </span>
              </div>
              
              <div class="info-row">
                <span class="info-label">Compañero:</span>
                <span class="info-value">
                  {{ inv.mesa.titular.nombre === usuarioActual.nombre ? inv.mesa.vocal.nombre : inv.mesa.titular.nombre }}
                </span>
              </div>

              <div class="info-row">
                <span class="info-label">Modalidad:</span>
                <span class="info-value tipo-badge" :class="inv.mesa.tipo">
                  <i class="modalidad-icon">{{ inv.mesa.tipo === 'virtual' ? '💻' : '🏫' }}</i>
                  {{ inv.mesa.tipo === 'virtual' ? 'Virtual' : 'Presencial' }}
                </span>
              </div>

              <div v-if="inv.mesa.tipo === 'presencial' && inv.mesa.aula" class="info-row">
                <span class="info-label">Aula:</span>
                <span class="info-value aula-info">
                  <i class="aula-icon">📍</i>
                  {{ inv.mesa.aula }}
                </span>
              </div>

              <div v-if="inv.mesa.tipo === 'virtual' && inv.mesa.linkWebex" class="info-row">
                <span class="info-label">Webex:</span>
                <a :href="inv.mesa.linkWebex" target="_blank" class="webex-link">
                  <i class="webex-icon">🔗</i>
                  Unirse a la mesa virtual
                </a>
              </div>
              
              <div class="info-row">
                <span class="info-label">Estado:</span>
                <span class="info-value status-badge" :class="getInvitationStatusClass(inv)">
                  {{ calcularEstado(inv) }}
                </span>
              </div>
            </div>
            
            <div v-if="puedeAceptarRechazar(inv)" class="action-buttons">
              <button @click="aceptarInvitacion(inv.mesa.id)" class="btn btn-accept">
                ✓ Aceptar
              </button>
              <button @click="rechazarInvitacion(inv.mesa.id)" class="btn btn-reject">
                ✗ Rechazar
              </button>
            </div>
          </div>
        </div>
        
        <div v-else class="empty-state">
          <div class="empty-icon">📬</div>
          <p class="empty-message">No tienes invitaciones pendientes</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthService from '../service/SingletonAuthService';
const authService = AuthService.getInstance();

export default {
  data() {
    return {
      usuarioActual: { nombre: "Invitado" },
      mesas: [],
      invitaciones: [],
      notificadas: [],
      apiUrl: 'http://localhost:3000/api'
    };
  },

  mounted() {
    const nombre = authService.getUsuarioActual();
    this.usuarioActual.nombre = nombre || "Invitado";
    this.cargarMesasYInvitaciones();
    this.pedirPermisoNotificacion();

    const guardadas = localStorage.getItem('mesasNotificadas');
    this.notificadas = guardadas ? JSON.parse(guardadas) : [];

    // Verificar nuevas confirmaciones cada 10 segundos
    setInterval(() => {
      this.verificarNuevasConfirmaciones();
    }, 10000);

    // Verificar mensajes push pendientes cada 5 segundos
    setInterval(() => {
      this.verificarMensajesPush();
    }, 5000);
  },

  computed: {
    mesasAsignadas() {
      const usuario = this.usuarioActual.nombre;
      return this.mesas
        .filter(mesa => mesa.titular?.nombre === usuario || mesa.vocal?.nombre === usuario)
        .map(mesa => {
          const invitacion = this.invitaciones.find(i => i.mesa.id === mesa.id);
          return invitacion ? { ...mesa, estados: invitacion.estados } : mesa;
        })
        .filter(mesa => {
          const estados = mesa.estados || {};
          return Object.values(estados).filter(e => e === 'aceptada').length === 2;
        });
    }
  },

  methods: {
    obtenerRol(mesa) {
      return mesa.titular?.nombre === this.usuarioActual.nombre ? 'titular' : 'vocal';
    },

    obtenerOtroNombre(mesa) {
      return mesa.titular?.nombre === this.usuarioActual.nombre
        ? mesa.vocal?.nombre
        : mesa.titular?.nombre;
    },

    calcularEstadoMesa(mesa) {
      const estados = mesa.estados || {};
      const aceptados = Object.values(estados).filter(e => e === 'aceptada').length;
      const rechazados = Object.values(estados).filter(e => e === 'rechazada').length;

      if (rechazados > 0) return "Mesa rechazada";
      if (aceptados === 2) return "Aceptada";
      if (aceptados === 1) return "Esperando confirmación (1/2)";
      return "Esperando confirmación (0/2)";
    },

    calcularEstado(inv) {
      const estados = Object.values(inv.estados);
      const aceptados = estados.filter(e => e === 'aceptada').length;
      const rechazados = estados.filter(e => e === 'rechazada').length;

      if (rechazados > 0) return "Mesa rechazada";
      if (aceptados === 2) return "Aceptada";
      if (aceptados === 1) return "Esperando confirmación (1/2)";
      return "Esperando confirmación (0/2)";
    },

    getStatusClass(mesa) {
      const estado = this.calcularEstadoMesa(mesa);
      if (estado.includes('rechazada')) return 'rejected';
      if (estado.includes('Aceptada')) return 'accepted';
      if (estado.includes('Esperando')) return 'pending';
      return 'pending';
    },

    getInvitationStatusClass(inv) {
      const estado = this.calcularEstado(inv);
      if (estado.includes('rechazada')) return 'rejected';
      if (estado.includes('Aceptada')) return 'accepted';
      if (estado.includes('Esperando')) return 'pending';
      return 'pending';
    },

    puedeAceptarRechazar(inv) {
      return inv.estados[this.usuarioActual.nombre] === 'pendiente';
    },

    aceptarInvitacion(id) {
      fetch(`${this.apiUrl}/invitaciones/aceptar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, usuario: this.usuarioActual.nombre })
      }).then(() => {
        this.cargarMesasYInvitaciones();
      });
    },

    rechazarInvitacion(id) {
      fetch(`${this.apiUrl}/invitaciones/rechazar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, usuario: this.usuarioActual.nombre })
      }).then(() => {
        this.cargarMesasYInvitaciones();
      });
    },

    async cargarMesasYInvitaciones() {
      try {
        const [invitacionesRes, mesasRes] = await Promise.all([
          fetch(`${this.apiUrl}/invitaciones/${this.usuarioActual.nombre}`),
          fetch(`${this.apiUrl}/mesas/${this.usuarioActual.nombre}`)
        ]);

        if (!invitacionesRes.ok || !mesasRes.ok) {
          throw new Error('Error al cargar datos');
        }

        const invitaciones = await invitacionesRes.json();
        const mesasConfirmadas = await mesasRes.json();

        this.invitaciones = invitaciones;
        this.mesas = mesasConfirmadas;
      } catch (error) {
        console.error('Error:', error);
        this.error = 'Error al cargar las mesas e invitaciones';
      }
    },

    async pedirPermisoNotificacion() {
      if ('Notification' in window) {
        try {
          const permiso = await Notification.requestPermission();
          if (permiso === 'granted') {
            const response = await fetch(`${this.apiUrl}/notificaciones/registrar`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                usuario: this.usuarioActual.nombre
              })
            });

            if (!response.ok) throw new Error('Error al registrar la notificación');
            console.log('Notificaciones registradas exitosamente');
          }
        } catch (error) {
          console.error('Error al configurar notificaciones:', error);
        }
      }
    },

    verificarNuevasConfirmaciones() {
      const nombre = this.usuarioActual.nombre;
      fetch(`${this.apiUrl}/invitaciones/${nombre}`)
        .then(res => res.json())
        .then(data => {
          const nuevasConfirmadas = data.filter(inv => {
            const estados = Object.values(inv.estados);
            return estados.every(e => e === 'aceptada') &&
              !this.notificadas.includes(inv.mesa.id);
          });

          nuevasConfirmadas.forEach(inv => {
            this.notificadas.push(inv.mesa.id);
            localStorage.setItem('mesasNotificadas', JSON.stringify(this.notificadas));
          });

          if (nuevasConfirmadas.length > 0) {
            this.cargarMesasYInvitaciones();
          }
        });
    },

    async verificarMensajesPush() {
      if (!('Notification' in window) || Notification.permission !== 'granted') {
        return;
      }

      try {
        const response = await fetch(`${this.apiUrl}/notificaciones/push/${this.usuarioActual.nombre}`);
        if (!response.ok) throw new Error('Error al obtener mensajes push');
        
        const { mensajes } = await response.json();
        
        mensajes.forEach(mensaje => {
          new Notification(mensaje.titulo, {
            body: mensaje.cuerpo,
            icon: '/icon-192x192.png',
            requireInteraction: true,
            vibrate: [100, 50, 100]
          });
        });
      } catch (error) {
        console.error('Error al verificar mensajes push:', error);
      }
    }
  }
};
</script>

<style scoped>
/* Variables CSS similares al estilo del login */
:root {
  --primary-color: #007aff;
  --primary-hover: #0056b3;
  --success-color: #28a745;
  --danger-color: #dc3545;
  --warning-color: #ffc107;
  --bg-color: #f8f9fa;
  --card-bg: white;
  --card-bg-secondary: #fafbfc;
  --text-primary: #333333;
  --text-secondary: #666666;
  --border-color: #e0e0e0;
  --shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  --border-radius: 12px;
}

/* Tema oscuro */
.dark {
  --primary-color: #4a9eff;
  --primary-hover: #007aff;
  --success-color: #34d058;
  --danger-color: #f85149;
  --warning-color: #ffc107;
  --bg-color: #0d1117;
  --card-bg: #161b22;
  --card-bg-secondary: #21262d;
  --text-primary: #f0f6fc;
  --text-secondary: #8b949e;
  --border-color: #30363d;
  --shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  --border-radius: 12px;
}

.dashboard-page {
  background: var(--bg-color);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  padding: 2rem 0;
}

.dashboard-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Header del Dashboard */
.dashboard-header {
  text-align: center;
  margin-bottom: 3rem;
}

.dashboard-logo {
  max-width: 120px;
  height: auto;
  margin-bottom: 1rem;
}

.welcome-title {
  font-size: 2rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

/* Tarjetas de Sección */
.section-card {
  background: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid var(--border-color);
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.icon {
  font-size: 1.2rem;
}

/* Grid de Mesas */
.mesas-grid,
.invitaciones-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 1.5rem;
}

/* Tarjetas de Mesa e Invitación */
.mesa-card,
.invitacion-card {
  background: var(--card-bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1.5rem;
  transition: all 0.2s ease;
}

.mesa-card:hover,
.invitacion-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.mesa-header,
.invitacion-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.mesa-materia,
.invitacion-materia {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  flex: 1;
}

/* Fecha y Hora */
.fecha-hora {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
}

.mesa-fecha,
.invitacion-fecha {
  background: var(--primary-color);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
}

.mesa-hora,
.invitacion-hora {
  background: #6c757d;
  color: white;
  padding: 0.375rem 1rem;
  border-radius: 20px;
  font-size: 1rem;
  font-weight: 600;
  white-space: nowrap;
}

/* Información de Mesa/Invitación */
.mesa-info,
.invitacion-info {
  margin-bottom: 1rem;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.info-label {
  font-weight: 500;
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.info-value {
  font-weight: 500;
  color: var(--text-primary);
}

/* Badges */
.role-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.role-badge.titular {
  background: #e3f2fd;
  color: #1976d2;
}

.dark .role-badge.titular {
  background: #1e3a8a;
  color: #93c5fd;
}

.role-badge.vocal {
  background: #f3e5f5;
  color: #7b1fa2;
}

.dark .role-badge.vocal {
  background: #581c87;
  color: #d8b4fe;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
}

.status-badge.accepted {
  background: #d4edda;
  color: #155724;
}

.dark .status-badge.accepted {
  background: #1b5e20;
  color: #81c784;
}

.status-badge.rejected {
  background: #f8d7da;
  color: #721c24;
}

.dark .status-badge.rejected {
  background: #b71c1c;
  color: #ef5350;
}

.status-badge.pending {
  background: #fff3cd;
  color: #856404;
}

.dark .status-badge.pending {
  background: #ff8f00;
  color: #1a1a1a;
}

/* Badges de tipo de mesa */
.tipo-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.tipo-badge.virtual {
  background: #e8f5e8;
  color: #2e7d32;
}

.dark .tipo-badge.virtual {
  background: #1b4332;
  color: #52b788;
}

.tipo-badge.presencial {
  background: #fff3e0;
  color: #f57c00;
}

.dark .tipo-badge.presencial {
  background: #3c2e1f;
  color: #ffb74d;
}

.modalidad-icon {
  font-size: 0.875rem;
}

/* Información de aula */
.aula-info {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-weight: 500;
}

.aula-icon {
  font-size: 0.875rem;
  color: #f57c00;
}

/* Link de Webex */
.webex-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--primary-color);
  border-radius: 6px;
  transition: all 0.2s ease;
  background: var(--card-bg);
}

.webex-link:hover {
  background: var(--primary-color);
  color: white;
  text-decoration: none;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(var(--primary-color), 0.3);
}

.webex-icon {
  font-size: 1rem;
}

/* Sección de Alumnos */
.alumnos-section {
  border-top: 1px solid var(--border-color);
  padding-top: 1rem;
}

.alumnos-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.alumnos-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.alumno-tag {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  color: var(--text-primary);
}

/* Botones de Acción */
.action-buttons {
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
}

.btn {
  flex: 1;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  opacity: 1;
  visibility: visible;
  position: relative;
  z-index: 1;
}

.btn-accept {
  background-color: #28a745;
  color: white;
  border: 1px solid #28a745;
  opacity: 1;
  visibility: visible;
}

.btn-accept:hover {
  background-color: #218838;
  border-color: #218838;
  transform: translateY(-1px);
}

.btn-reject {
  background-color: #dc3545;
  color: white;
  border: 1px solid #dc3545;
  opacity: 1;
  visibility: visible;
}

.btn-reject:hover {
  background-color: #c82333;
  border-color: #c82333;
  transform: translateY(-1px);
}

/* Estado Vacío */
.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: var(--text-secondary);
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-message {
  font-size: 1.125rem;
  margin: 0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .dashboard-container {
    padding: 0 1rem;
  }
  
  .section-card {
    padding: 1.5rem;
  }
  
  .mesas-grid,
  .invitaciones-grid {
    grid-template-columns: 1fr;
  }
  
  .mesa-header,
  .invitacion-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .fecha-hora {
    align-items: flex-start;
  }
  
  .info-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
  
  .action-buttons {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .dashboard-page {
    padding: 1rem 0;
  }
  
  .section-card {
    margin: 0 -0.5rem 1rem;
    border-radius: 0;
  }
  
  .welcome-title {
    font-size: 1.5rem;
  }
}
</style>