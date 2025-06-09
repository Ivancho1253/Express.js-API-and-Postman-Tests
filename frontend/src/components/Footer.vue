<template>
    <footer class="footer">
        <div class="footer-content">
            <img src="/img/Imagen-Stich-removebg-preview.png" alt="Stitch" class="footer-image">
            <p>Copyright &copy; 2025: Empresa Los Reales</p>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style scoped>
    .footer {
        text-align: center;
        padding: 1rem;
        background-color: var(--header-bg);
        color: var(--text-color);
    }

    .footer-content {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        flex-wrap: wrap;
    }

    .footer-image {
        max-width: 40px;
        height: auto;
        transition: transform 0.3s ease;
    }

    .footer-image:hover {
        transform: scale(1.1);
    }

    .footer-content p {
        margin: 0;
        font-size: 0.9rem;
    }

    /* Responsive para móviles */
    @media (max-width: 480px) {
        .footer-content {
            flex-direction: column;
            gap: 0.5rem;
        }
        
        .footer-image {
            max-width: 30px;
        }
        
        .footer-content p {
            font-size: 0.8rem;
        }
    }
</style>