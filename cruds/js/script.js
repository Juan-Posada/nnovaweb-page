const sidebar          = document.querySelector('.sidebar-aside')
const main             = document.querySelector('.main')
const burgerMenuButton = document.querySelector('.burger-menu')

burgerMenuButton.addEventListener('click', function(){
    sidebar.classList.toggle('sidebar-hidden')
    main.classList.toggle('main-complete')
})