<template>
  <div class="login-page d-flex flex-column min-vh-100 justify-content-center align-items-center">
    <!-- Tarjeta de login centrada -->
    <div class="login-container">
      <div class="login-card">

        <img id="logo-ucp" src="/img/logo-ucp.png" class="login-logo">

        <h2 class="login-title">Iniciar Sesión</h2>
        <p class="login-subtitle">Ingresa tus credenciales para acceder</p>
        
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="username" class="form-label">Usuario</label>
            <input 
              v-model="username" 
              type="text" 
              id="username" 
              class="form-control" 
              placeholder="Ingresa tu usuario" 
              required 
            />
          </div>
          
          <div class="form-group">
            <label for="password" class="form-label">Contraseña</label>
            <input 
              v-model="password" 
              type="password" 
              id="password" 
              class="form-control" 
              placeholder="Ingresa tu contraseña" 
              required 
            />
          </div>
          
          <button type="submit" class="btn btn-login">Ingresar</button>
          
          <p v-if="error" class="error-message">{{ error }}</p>
        </form>
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
      username: '',
      password: '',
      error: ''
    };
  },
  methods: {
    async login() {
      const exito = await authService.login(this.username, this.password);
      if (exito) {
        this.$router.push('/dashboard');
      } else {
        this.error = "Usuario o contraseña incorrectos";
      }
    }
  }
};
</script>

<style scoped>

#logo-ucp {
  max-width: 100%;
  width: 100%;
  height: auto;
}


.login-page {
  background: var(--bg-color);
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  padding-top: 80px;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 2rem;
}

.login-card {
  background: white; 
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  padding: 3rem;
  width: 100%;
  max-width: 400px;
  border: 1px solid #e0e0e0;
  position: relative; /* Asegurar que esté por encima del fondo */
  z-index: 1; /* Índice z para estar por encima */
}

.login-logo {
  display: block;
  margin: 0 auto 1.5rem auto;
  max-width: 120px;
  height: auto;
}

.login-title {
  font-size: 1.75rem;
  font-weight: 600;
  color: #333333;
  text-align: center;
  margin-bottom: 0.5rem;
}

.login-subtitle {
  color: #666666;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 0.875rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  font-weight: 500;
  color: #333333;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}

.form-control {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #d0d0d0;
  border-radius: 8px;
  font-size: 1rem;
  background-color: white;
  color: #333333;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.form-control:focus {
  outline: none;
  border-color: #007aff;
  box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.1);
  background-color: white;
}

.form-control::placeholder {
  color: #999999;
}

.btn-login {
  width: 100%;
  padding: 0.875rem;
  background-color: #007aff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 0.5rem;
}

.btn-login:hover {
  background-color: #0056b3;
  transform: translateY(-1px);
}

.btn-login:active {
  transform: translateY(0);
}

.error-message {
  color: #ff3b30;
  text-align: center;
  margin-top: 1rem;
  font-size: 0.875rem;
}

/* Responsive design */
@media (max-width: 768px) {
  .login-page {
    padding-top: 70px;
  }
  
  .login-card {
    padding: 2rem;
    margin: 1rem;
  }
  
  .login-container {
    padding: 1rem;
  }
}
</style>