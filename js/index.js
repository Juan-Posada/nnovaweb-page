document.addEventListener('DOMContentLoaded', function () {
    // Elementos del DOM
    const burgerMenu = document.querySelector('.burger-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    const closeMenu = document.querySelector('.close-menu');
    const overlay = document.querySelector('.mobile-nav-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const body = document.body;

    // Variables de estado
    let isMenuOpen = false;

    // Función para abrir el menú
    function openMenu() {
        if (!isMenuOpen) {
            mobileNav.classList.add('active');
            body.classList.add('menu-open');
            isMenuOpen = true;

            // Agregar animación de entrada a los enlaces
            mobileLinks.forEach((link, index) => {
                link.style.transitionDelay = `${0.1 + (index * 0.1)}s`;
            });

            // Prevenir scroll en el body
            body.style.overflow = 'hidden';
        }
    }

    // Función para cerrar el menú
    function closeMenuFunc() {
        if (isMenuOpen) {
            mobileNav.classList.remove('active');
            body.classList.remove('menu-open');
            isMenuOpen = false;

            // Restaurar scroll del body
            body.style.overflow = '';

            // Remover delays de transición
            mobileLinks.forEach(link => {
                link.style.transitionDelay = '0s';
            });
        }
    }

    // Event listeners para abrir el menú
    if (burgerMenu) {
        burgerMenu.addEventListener('click', function (e) {
            e.stopPropagation();
            openMenu();
        });

        // Agregar efecto hover táctil para dispositivos móviles
        burgerMenu.addEventListener('touchstart', function () {
            this.style.transform = 'scale(0.95)';
        });

        burgerMenu.addEventListener('touchend', function () {
            this.style.transform = 'scale(1)';
        });
    }

    // Event listener para cerrar el menú
    if (closeMenu) {
        closeMenu.addEventListener('click', function (e) {
            e.stopPropagation();
            closeMenuFunc();
        });
    }

    // Cerrar menú al hacer click en el overlay
    if (overlay) {
        overlay.addEventListener('click', closeMenuFunc);
    }

    // Cerrar menú al hacer click en un enlace
    mobileLinks.forEach(link => {
        link.addEventListener('click', function () {
            // Pequeño delay para permitir que se vea el efecto hover
            setTimeout(closeMenuFunc, 200);
        });

        // Agregar efecto táctil a los enlaces
        link.addEventListener('touchstart', function () {
            this.style.transform = 'translateX(15px)';
            this.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
        });

        link.addEventListener('touchend', function () {
            this.style.transform = '';
            this.style.backgroundColor = '';
        });
    });

    // Cerrar menú con tecla Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMenuFunc();
        }
    });

    // Manejar cambio de orientación del dispositivo
    window.addEventListener('orientationchange', function () {
        if (isMenuOpen) {
            // Pequeño delay para permitir que se complete el cambio de orientación
            setTimeout(() => {
                // Reajustar el menú si es necesario
                const mobileNavContent = document.querySelector('.mobile-nav-content');
                if (mobileNavContent) {
                    mobileNavContent.style.height = '100vh';
                }
            }, 100);
        }
    });

    // Prevenir scroll cuando el menú está abierto (para iOS Safari)
    document.addEventListener('touchmove', function (e) {
        if (isMenuOpen) {
            // Permitir scroll solo dentro del contenido del menú
            let target = e.target;
            let isInsideMenuContent = false;

            while (target && target !== document.body) {
                if (target.classList && target.classList.contains('mobile-nav-content')) {
                    isInsideMenuContent = true;
                    break;
                }
                target = target.parentElement;
            }

            if (!isInsideMenuContent) {
                e.preventDefault();
            }
        }
    }, { passive: false });

    // Manejar resize de ventana
    window.addEventListener('resize', function () {
        // Si estamos en desktop y el menú está abierto, cerrarlo
        if (window.innerWidth > 768 && isMenuOpen) {
            closeMenuFunc();
        }
    });

    // Función para detectar si es un dispositivo táctil
    function isTouchDevice() {
        return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0));
    }

    // Optimizaciones para dispositivos táctiles
    if (isTouchDevice()) {
        // Agregar clase para dispositivos táctiles
        body.classList.add('touch-device');

        // Mejorar la respuesta táctil
        const touchElements = [burgerMenu, closeMenu, ...mobileLinks];

        touchElements.forEach(element => {
            if (element) {
                element.addEventListener('touchstart', function () {
                    this.classList.add('touch-active');
                });

                element.addEventListener('touchend', function () {
                    this.classList.remove('touch-active');
                });

                element.addEventListener('touchcancel', function () {
                    this.classList.remove('touch-active');
                });
            }
        });
    }

    // Función para animar la entrada del menú (llamada desde CSS)
    function animateMenuEntrance() {
        if (isMenuOpen) {
            const menuItems = document.querySelectorAll('.mobile-nav-links li');
            menuItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, 100 + (index * 100));
            });
        }
    }

    // Exponer función global para uso en otros scripts si es necesario
    window.MobileMenu = {
        open: openMenu,
        close: closeMenuFunc,
        toggle: function () {
            if (isMenuOpen) {
                closeMenuFunc();
            } else {
                openMenu();
            }
        },
        isOpen: function () {
            return isMenuOpen;
        }
    };
});

// Smooth scroll para enlaces internos (si los hay)
function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Debounce function para optimizar eventos de resize
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Aplicar debounce al evento resize
const debouncedResize = debounce(function () {
    if (window.innerWidth > 768 && window.MobileMenu && window.MobileMenu.isOpen()) {
        window.MobileMenu.close();
    }
}, 250);

window.addEventListener('resize', debouncedResize);

// ----------------------------------------------------------------------------------------------------------------------------------------------
// Detectar si es un dispositivo móvil
const esMovil = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
// Esperar a que el DOM esté listo

document.addEventListener("DOMContentLoaded", () => {
    const link = document.getElementById("login");
    if (link) {
        // Cambiar el destino según el dispositivo
        link.href = esMovil ? "../formulario/mobile.html" : "../formulario/index.html";
    }
});


// ----------------------------------------------------------------------------------------------------------------------------------------------
// CARRUSEL DE CLIENTES - SOLO PARA DESKTOP (mayor a 768px)
// ----------------------------------------------------------------------------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function() {
    // Función para verificar si estamos en modo desktop
    function isDesktop() {
        return window.innerWidth > 768;
    }

    // Solo ejecutar el carrusel en desktop
    if (!isDesktop()) {
        console.log('Modo móvil detectado - Carrusel desactivado');
        return;
    }

    // Elementos del carrusel
    const carouselContainer = document.getElementById('carousel-container');
    const prevButton = document.getElementById('carousel-prev');
    const nextButton = document.getElementById('carousel-next');
    const customerInfo = document.getElementById('current-customer-info');
    
    // Verificar que los elementos existan (solo en desktop)
    if (!carouselContainer || !prevButton || !nextButton || !customerInfo) {
        console.log('Elementos del carrusel no encontrados');
        return;
    }
    
    // Obtener todos los items de clientes
    const customerItems = document.querySelectorAll('.customer-item');
    
    // Variables del carrusel
    let currentIndex = 3; // Empezar con Coca-Cola (índice 3) en el centro
    let isAnimating = false;
    
    // Ancho de cada item + gap
    const itemWidth = 197; // 175px (ancho) + 22px (gap)
    
    // Función para actualizar la información del cliente actual
    function updateCustomerInfo() {
        const currentItem = customerItems[currentIndex];
        const customerName = currentItem.querySelector('.customer-name').textContent;
        const customerLocation = currentItem.querySelector('.customer-location').textContent;
        
        customerInfo.textContent = `${customerName}, ${customerLocation}`;
    }
    
    // Función para actualizar las clases activas
    function updateActiveClasses() {
        customerItems.forEach((item, index) => {
            if (index === currentIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
    
    // Función para mover el carrusel
    function moveCarousel() {
        if (isAnimating) return;
        
        isAnimating = true;
        
        // Calcular el offset necesario para centrar el item actual
        const containerWidth = document.querySelector('.carousel-wrapper').offsetWidth;
        const offset = (containerWidth / 2) - (itemWidth / 2) - (currentIndex * itemWidth);
        
        // Aplicar la transformación
        carouselContainer.style.transform = `translateX(${offset}px)`;
        
        // Actualizar clases y info
        updateActiveClasses();
        updateCustomerInfo();
        
        // Permitir nueva animación después de 500ms
        setTimeout(() => {
            isAnimating = false;
        }, 500);
    }
    
    // Event listener para botón anterior
    prevButton.addEventListener('click', function() {
        if (currentIndex > 0 && !isAnimating) {
            currentIndex--;
            moveCarousel();
        }
    });
    
    // Event listener para botón siguiente
    nextButton.addEventListener('click', function() {
        if (currentIndex < customerItems.length - 1 && !isAnimating) {
            currentIndex++;
            moveCarousel();
        }
    });
    
    // Soporte para teclado (flechas izquierda/derecha)
    document.addEventListener('keydown', function(e) {
        if (!isDesktop()) return; // Solo en desktop
        
        if (e.key === 'ArrowLeft') {
            prevButton.click();
        } else if (e.key === 'ArrowRight') {
            nextButton.click();
        }
    });
    
    // NO agregar soporte para swipe en desktop
    // El swipe solo debe funcionar en móvil con scroll nativo
    
    // Auto-play opcional (comentado por defecto)
    /*
    let autoPlayInterval;
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            if (currentIndex < customerItems.length - 1) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            moveCarousel();
        }, 3000); // Cambiar cada 3 segundos
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    // Iniciar auto-play
    startAutoPlay();
    
    // Pausar auto-play al hacer hover
    carouselContainer.addEventListener('mouseenter', stopAutoPlay);
    carouselContainer.addEventListener('mouseleave', startAutoPlay);
    
    // Pausar auto-play al usar controles manuales
    prevButton.addEventListener('click', () => {
        stopAutoPlay();
        setTimeout(startAutoPlay, 5000); // Reanudar después de 5 segundos
    });
    
    nextButton.addEventListener('click', () => {
        stopAutoPlay();
        setTimeout(startAutoPlay, 5000); // Reanudar después de 5 segundos
    });
    */
    
    // Inicializar el carrusel solo en desktop
    moveCarousel();
    
    // Reajustar al cambiar tamaño de ventana
    window.addEventListener('resize', debounce(function() {
        if (isDesktop()) {
            moveCarousel();
        } else {
            // Si cambiamos a móvil, resetear el transform
            if (carouselContainer) {
                carouselContainer.style.transform = '';
            }
        }
    }, 250));
});