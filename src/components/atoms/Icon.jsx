export default function Icon({ name, ...props }) {
  return (
    <span className="icon" aria-hidden="true" {...props}>
      {name}
    </span>
  );
}
