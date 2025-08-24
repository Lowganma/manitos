import Swal from 'sweetalert2';

export default function ConfirmModal({ title, text, onConfirm, children }) {
  const handleClick = async () => {
    const res = await Swal.fire({ title, text, showCancelButton: true, confirmButtonText: 'Sí' });
    if (res.isConfirmed) onConfirm();
  };
  return <span onClick={handleClick}>{children}</span>;
}
