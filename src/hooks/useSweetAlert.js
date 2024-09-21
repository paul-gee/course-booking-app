import Swal from 'sweetalert2';

export default function useSweetAlert() {

  const openAlert = ({ type = 'success', title, text }) => {
    return Swal.fire({
      title,
      icon: type,
      text,
      confirmButtonColor: "#23857a"
    });
  }

  return { openAlert }
}