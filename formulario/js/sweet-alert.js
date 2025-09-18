emailjs.init('QLLxcOOH21jhrgGpp');
        
// Configuración personalizada de SweetAlert2 con los colores de tu CSS
const customSwal = Swal.mixin({
    customClass: {
        confirmButton: 'custom-confirm-btn',
        cancelButton: 'custom-cancel-btn',
        popup: 'custom-popup',
        title: 'custom-title',
        content: 'custom-content'
    },
    buttonsStyling: false
});

// Agregar estilos CSS personalizados para SweetAlert2
const style = document.createElement('style');
style.textContent = `
    .custom-popup {
        border-radius: 20px !important;
        border: 2px solid #08003F !important;
        box-shadow: 6px 4px 10px rgba(117, 117, 117, 0.84) !important;
    }
    
    .custom-title {
        color: #08003F !important;
        font-family: "Work Sans", sans-serif !important;
        font-weight: bold !important;
        font-size: 20px !important;
    }
    
    .custom-content {
        color: #2D2D2D !important;
        font-family: "Work Sans", sans-serif !important;
        font-size: 16px !important;
    }
    
    .custom-confirm-btn {
        background-color: #08003F !important;
        color: #ffffff !important;
        border: none !important;
        border-radius: 10px !important;
        padding: 12px 24px !important;
        font-family: "Work Sans", sans-serif !important;
        font-size: 16px !important;
        font-weight: normal !important;
        transition: all 0.3s ease !important;
        margin: 0 8px !important;
    }
    
    .custom-confirm-btn:hover {
        background-color: #100978 !important;
        transform: translateY(-2px) !important;
        box-shadow: 0 5px 15px rgba(8, 0, 63, 0.4) !important;
    }
    
    .custom-cancel-btn {
        background-color: #EBE5E5 !important;
        color: #08003F !important;
        border: 2px solid #08003F !important;
        border-radius: 10px !important;
        padding: 12px 24px !important;
        font-family: "Work Sans", sans-serif !important;
        font-size: 16px !important;
        font-weight: normal !important;
        transition: all 0.3s ease !important;
        margin: 0 8px !important;
    }
    
    .custom-cancel-btn:hover {
        background-color: #08003F !important;
        color: #ffffff !important;
        transform: translateY(-2px) !important;
    }
    
    
    .swal2-icon.swal2-error {
        border-color: #ff0000 !important;
        color: #ff0000 !important;
    }
    
    .swal2-icon.swal2-error .swal2-x-mark {
        color: #ff0000 !important;
    }
    
    .swal2-loader {
        border-color: #5498FF transparent #5498FF transparent !important;
    }
`;
document.head.appendChild(style);