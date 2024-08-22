const botonVerLuego = document.getElementById('espera')
const botonMeGusta = document.getElementById('gustado')
const botonSeguido = document.getElementById('seguido')

const notificacion = document.getElementById('notificacion')
const notificacionMensaje = document.querySelector('.notificacion p')
const notificacionIcon = document.querySelector('.notificacion i')

botonVerLuego.addEventListener('click', () => {
    const libroId = botonVerLuego.getAttribute('data-libroId')
    fetch('http://localhost:3000/favorito/' + libroId + '/agregar', { method: 'post' })
        .then(response => {
            if (response.ok) {
                notificacion.style.display = 'flex'
                notificacion.style.borderTopColor = 'orange'

                notificacionIcon.className = 'fa-solid fa-check'
                notificacionMensaje.innerHTML = 'Libro añadido a tu lista de ver luego.'

                return
            }

            if (response.statusText == 'user_not_logged') {
                notificacion.style.display = 'flex'
                notificacion.style.borderTopColor = 'red'

                notificacionIcon.className = 'fa-solid fa-arrow-down'
                notificacionMensaje.innerHTML = 'Inicia sesión para poder utilizar esto.'

                return
            }

            notificacion.style.display = 'flex'
            notificacion.style.borderTopColor = 'orange'

            notificacionIcon.className = 'fa-solid fa-x'
            notificacionMensaje.innerHTML = 'Este libro ya esta añadido a tu lista de ver luego.'
        })
})

botonMeGusta.addEventListener('click', () => {
    const libroId = botonMeGusta.getAttribute('data-libroId')
    fetch('http://localhost:3000/gustado/' + libroId + '/agregar', { method: 'post' })
        .then(response => {
            if (response.ok) {
                notificacion.style.display = 'flex'
                notificacion.style.borderTopColor = 'red'

                notificacionIcon.className = 'fa-solid fa-check'
                notificacionMensaje.innerHTML = 'Libro añadido a tu lista de gustados.'

                return
            } 

            if (response.statusText == 'user_not_logged') {
                notificacion.style.display = 'flex'
                notificacion.style.borderTopColor = 'red'

                notificacionIcon.className = 'fa-solid fa-arrow-down'
                notificacionMensaje.innerHTML = 'Inicia sesión para poder utilizar esto.'

                return
            }

            notificacion.style.display = 'flex'
            notificacion.style.borderTopColor = 'red'

            notificacionIcon.className = 'fa-solid fa-x'
            notificacionMensaje.innerHTML = 'Este libro ya esta añadido a tu lista de gustados.'      
        })
})

botonSeguido.addEventListener('click', () => {
    const libroId = botonSeguido.getAttribute('data-libroId')
    console.log(libroId)

    fetch('http://localhost:3000/seguido/' + libroId + '/agregar', { method: 'post' })
        .then(response => {
            if (response.ok) {
                notificacion.style.display = 'flex'
                notificacion.style.borderTopColor = '#09f'

                notificacionIcon.className = 'fa-solid fa-check'
                notificacionMensaje.innerHTML = 'Libro añadido a tu lista de seguidos.'

                return
            } 

            if (response.statusText == 'user_not_logged') {
                notificacion.style.display = 'flex'
                notificacion.style.borderTopColor = 'red'

                notificacionIcon.className = 'fa-solid fa-arrow-down'
                notificacionMensaje.innerHTML = 'Inicia sesión para poder utilizar esto.'

                return
            }

            notificacion.style.display = 'flex'
            notificacion.style.borderTopColor = '#09f'

            notificacionIcon.className = 'fa-solid fa-x'
            notificacionMensaje.innerHTML = 'Este libro ya esta añadido a tu lista de seguidos.'
        })
})

notificacion.addEventListener('click', () => {
    notificacion.style.display = 'none'
})