const sidebar          = document.querySelector('.sidebar-aside')
const main             = document.querySelector('.main')
const burgerMenuButton = document.querySelector('.burger-menu')

burgerMenuButton.addEventListener('click', function(){
    sidebar.classList.toggle('sidebar-hidden')
    main.classList.toggle('main-complete')
})

// Animaciones de entrada retardada
document.addEventListener('DOMContentLoaded', function() {
    
    // Animar cards de usuarios con entrada escalonada
    const dataContainers = document.querySelectorAll('.data-container')
    dataContainers.forEach((card, index) => {
        card.style.opacity = '0'
        card.style.transform = 'translateY(30px) scale(0.9)'
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
            card.style.opacity = '1'
            card.style.transform = 'translateY(0) scale(1)'
        }, 100 * index)
    })

    // Animar elementos de la sidebar
    const redirectLinks = document.querySelectorAll('a#redirect-to')
    redirectLinks.forEach((link, index) => {
        link.style.opacity = '0'
        link.style.transform = 'translateX(-20px)'
        
        setTimeout(() => {
            link.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
            link.style.opacity = '1'
            link.style.transform = 'translateX(0)'
        }, 50 * index + 200)
    })

    // Animar perfil de la sidebar
    const profile = document.querySelector('.profile')
    if (profile) {
        profile.style.opacity = '0'
        profile.style.transform = 'scale(0.8)'
        
        setTimeout(() => {
            profile.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
            profile.style.opacity = '1'
            profile.style.transform = 'scale(1)'
        }, 100)
    }

    // Animar header
    const header = document.querySelector('header.header')
    if (header) {
        header.style.opacity = '0'
        header.style.transform = 'translateY(-20px)'
        
        setTimeout(() => {
            header.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
            header.style.opacity = '1'
            header.style.transform = 'translateY(0)'
        }, 50)
    }

    // Animar footer
    const footer = document.querySelector('footer.footer')
    if (footer) {
        footer.style.opacity = '0'
        footer.style.transform = 'translateY(20px)'
        
        setTimeout(() => {
            footer.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
            footer.style.opacity = '1'
            footer.style.transform = 'translateY(0)'
        }, 300)
    }

    // Animar elementos CRUD (create, edit, delete, view)
    const logoCrud = document.querySelector('.logo-create, .logo-edit, .logo-delete, .logo-view')
    if (logoCrud) {
        logoCrud.style.opacity = '0'
        logoCrud.style.transform = 'scale(0) rotate(-180deg)'
        
        setTimeout(() => {
            logoCrud.style.transition = 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1)'
            logoCrud.style.opacity = '1'
            logoCrud.style.transform = 'scale(1) rotate(0deg)'
        }, 200)
    }

    const containerCrud = document.querySelector('.create-container, .edit-container, .delete-container, .view-container')
    if (containerCrud) {
        containerCrud.style.opacity = '0'
        containerCrud.style.transform = 'translateY(30px) scale(0.95)'
        
        setTimeout(() => {
            containerCrud.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
            containerCrud.style.opacity = '1'
            containerCrud.style.transform = 'translateY(0) scale(1)'
        }, 400)
    }

    // Animar form groups con entrada escalonada
    const formGroups = document.querySelectorAll('.form-group-left, .form-group-right')
    formGroups.forEach((group, index) => {
        group.style.opacity = '0'
        group.style.transform = 'translateX(' + (index % 2 === 0 ? '-20px' : '20px') + ')'
        
        setTimeout(() => {
            group.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
            group.style.opacity = '1'
            group.style.transform = 'translateX(0)'
        }, 100 * index + 600)
    })

    // Animar botones de formularios
    const formButtons = document.querySelectorAll('.form-create-buttons, .form-edit-buttons, .form-delete-buttons, .form-view-buttons')
    formButtons.forEach((buttonGroup) => {
        buttonGroup.style.opacity = '0'
        buttonGroup.style.transform = 'translateY(20px)'
        
        setTimeout(() => {
            buttonGroup.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
            buttonGroup.style.opacity = '1'
            buttonGroup.style.transform = 'translateY(0)'
        }, 1000)
    })
})

// Efecto de partículas en el cursor para los botones de acción
const actionButtons = document.querySelectorAll('.button-action')
actionButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span')
        const rect = button.getBoundingClientRect()
        const size = Math.max(rect.width, rect.height)
        const x = e.clientX - rect.left - size / 2
        const y = e.clientY - rect.top - size / 2
        
        ripple.style.width = ripple.style.height = size + 'px'
        ripple.style.left = x + 'px'
        ripple.style.top = y + 'px'
        ripple.classList.add('ripple-effect')
        
        button.appendChild(ripple)
        
        setTimeout(() => {
            ripple.remove()
        }, 600)
    })
})

// Efecto parallax suave en las cards al mover el mouse
const section = document.querySelector('section.section')
if (section) {
    section.addEventListener('mousemove', function(e) {
        const cards = document.querySelectorAll('.data-container')
        
        cards.forEach(card => {
            const rect = card.getBoundingClientRect()
            const cardCenterX = rect.left + rect.width / 2
            const cardCenterY = rect.top + rect.height / 2
            
            const deltaX = (e.clientX - cardCenterX) / 50
            const deltaY = (e.clientY - cardCenterY) / 50
            
            card.style.transform = `perspective(1000px) rotateY(${deltaX}deg) rotateX(${-deltaY}deg) scale(1)`
        })
    })
    
    section.addEventListener('mouseleave', function() {
        const cards = document.querySelectorAll('.data-container')
        cards.forEach(card => {
            card.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) scale(1)'
        })
    })
}

// Animación de escribir en el buscador con efecto de ondas
const searchInput = document.querySelector('.search input[type="text"]')
if (searchInput) {
    searchInput.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.05)'
    })
    
    searchInput.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)'
    })
    
    searchInput.addEventListener('input', function() {
        const glass = this.parentElement.querySelector('.glass')
        if (glass) {
            glass.style.transform = 'scale(1.2) rotate(20deg)'
            setTimeout(() => {
                glass.style.transform = 'scale(1) rotate(0deg)'
            }, 200)
        }
    })
}

// Efecto de brillo siguiendo el cursor en las cards
document.querySelectorAll('.data-container').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        
        this.style.setProperty('--mouse-x', x + '%')
        this.style.setProperty('--mouse-y', y + '%')
    })
})

// Scroll suave para la sección de cards
const cardSection = document.querySelector('section.section')
if (cardSection) {
    let isScrolling
    cardSection.addEventListener('scroll', function() {
        cardSection.style.opacity = '0.8'
        
        clearTimeout(isScrolling)
        isScrolling = setTimeout(() => {
            cardSection.style.opacity = '1'
        }, 150)
    })
}

// Animación de contador para números (si hay estadísticas)
function animateCounter(element, target, duration = 1000) {
    let start = 0
    const increment = target / (duration / 16)
    
    const timer = setInterval(() => {
        start += increment
        if (start >= target) {
            element.textContent = target
            clearInterval(timer)
        } else {
            element.textContent = Math.floor(start)
        }
    }, 16)
}

// Efecto de shake al hacer hover en el botón de eliminar
const deleteButtons = document.querySelectorAll('a#delete')
deleteButtons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.animation = 'shake-delete 0.5s ease'
    })
    
    btn.addEventListener('animationend', function() {
        this.style.animation = ''
    })
})

// Agregar estilos CSS necesarios para las animaciones de JavaScript
const style = document.createElement('style')
style.textContent = `
    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    @keyframes shake-delete {
        0%, 100% { transform: translateX(0) scale(1); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-3px) scale(1.05); }
        20%, 40%, 60%, 80% { transform: translateX(3px) scale(1.05); }
    }
    
    .data-container {
        transition: transform 0.1s ease-out !important;
    }
    
    .data-container::after {
        content: '';
        position: absolute;
        width: 100px;
        height: 100px;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.2), transparent);
        border-radius: 50%;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s ease;
        left: var(--mouse-x, 50%);
        top: var(--mouse-y, 50%);
        transform: translate(-50%, -50%);
    }
    
    .data-container:hover::after {
        opacity: 1;
    }
    
    .search input[type="text"] {
        transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
    }
    
    section.section {
        transition: opacity 0.3s ease;
    }
`
document.head.appendChild(style)