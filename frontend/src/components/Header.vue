<template>
    <header class="header">
      <h1 class="header-title">Sistema de Mesas de Examen UCP</h1>
      <button @click="toggleTheme" class="theme-toggle-btn">
        <span class="theme-icon">{{ darkMode ? '☀️' : '🌙' }}</span>
        <span class="theme-text">{{ darkMode ? 'Modo claro' : 'Modo oscuro' }}</span>
      </button>
    </header>
  </template>
  
  <script>
  export default {
    name: 'Header',
    props: ['darkMode'],
    emits: ['toggleTheme'],
    methods: {
      toggleTheme() {
        this.$emit('toggleTheme')
      }
    }
  }
  </script>
  
  <style scoped>
  /* Variables CSS para tema UCP */
  :root {
    /* Colores principales del logo UCP */
    --ucp-green: #5fb3a3;      /* Verde agua del "7" */
    --ucp-blue: #2e5c8a;       /* Azul profundo de la "U" */
    --ucp-light-green: #7bc4b4; /* Verde más claro para acentos */
    --ucp-light-blue: #4a7ba7;  /* Azul más claro para acentos */
    
    /* Tema claro con colores UCP */
    --bg-color: #f8fafa;         /* Fondo muy suave inspirado en el blanco del logo */
    --card-bg: #ffffff;          /* Blanco puro para las tarjetas */
    --text-color: #2d3748;       /* Gris oscuro para mejor legibilidad */
    --text-secondary: #718096;   /* Gris medio para texto secundario */
    --border-color: #e2e8f0;     /* Borde suave */
    --input-bg: #f7fafc;         /* Fondo de inputs muy suave */
    --input-bg-focus: #ffffff;   /* Blanco al hacer focus */
    --header-bg: #ffffff;        /* Header blanco */
    
    /* Colores de acción usando los colores UCP */
    --primary-color: var(--ucp-blue);     /* Botones principales */
    --primary-hover: #1a4c73;             /* Hover más oscuro */
    --accent-color: var(--ucp-green);     /* Color de acento */
    --accent-hover: #4a9a8a;              /* Hover del acento */
  }
  
  /* Tema oscuro manteniendo la esencia UCP */
  .dark-mode {
    --bg-color: #1a202c;
    --card-bg: #ffffff;
    --text-color: #f7fafc;
    --text-secondary: #a0aec0;
    --border-color: #4a5568;
    --input-bg: #4a5568;
    --input-bg-focus: #718096;
    --header-bg: #2d3748;
    
    /* Mantenemos los colores UCP pero adaptados al modo oscuro */
    --primary-color: var(--ucp-light-blue);
    --primary-hover: var(--ucp-blue);
    --accent-color: var(--ucp-light-green);
    --accent-hover: var(--ucp-green);
  }
  
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: var(--header-bg);
    color: var(--text-color);
    border-bottom: 1px solid var(--border-color);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    z-index: 1000;
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
  }
  
  .header-title {
    font-size: 1.35rem;
    font-weight: 600;
    color: var(--text-color);
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    letter-spacing: -0.02em;
  }
  
  .theme-toggle-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 1.2rem;
    background-color: var(--input-bg);
    color: var(--text-color);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: inherit;
  }
  
  .theme-toggle-btn:hover {
    background-color: var(--accent-color);
    color: white;
    border-color: var(--accent-color);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(95, 179, 163, 0.3);
  }
  
  .theme-toggle-btn:active {
    transform: translateY(0);
    box-shadow: 0 2px 6px rgba(95, 179, 163, 0.2);
  }
  
  .theme-icon {
    font-size: 1rem;
    display: flex;
    align-items: center;
  }
  
  .theme-text {
    font-size: 0.875rem;
    white-space: nowrap;
  }
  
  /* Responsive design */
  @media (max-width: 768px) {
    .header {
      padding: 0.75rem 1rem;
    }
    
    .header-title {
      font-size: 1.1rem;
    }
    
    .theme-toggle-btn {
      padding: 0.5rem 0.8rem;
      gap: 0.3rem;
    }
    
    .theme-text {
      display: none; /* Ocultar texto en móvil, solo mostrar icono */
    }
    
    .theme-icon {
      font-size: 1.1rem;
    }
  }
  
  @media (max-width: 480px) {
    .header-title {
      font-size: 1rem;
    }
    
    .theme-toggle-btn {
      padding: 0.4rem 0.6rem;
    }
  }
  </style>