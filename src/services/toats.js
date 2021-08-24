import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

MySwal.fire({
    title: <p>Hello World</p>,
    footer: 'Copyright 2018',
    didOpen: () => {
        // `MySwal` is a subclass of `Swal`
        //   with all the same instance & static methods
        MySwal.clickConfirm()
    }
}).then(() => {
    return MySwal.fire(<p>Shorthand works too</p>)
})

export const loader = Swal.mixin({
    position: 'top-end',
    showConfirmButton: false,
    timerProgressBar: false,
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
    didOpen: (toast) => {
        Swal.showLoading()
    }
})

