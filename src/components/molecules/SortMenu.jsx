import Select from '../atoms/Select';

export default function SortMenu({ onSort }) {
  return (
    <Select onChange={(e) => onSort(e.target.value)} aria-label="sort">
      <option value="recent">Recientes</option>
      <option value="price">Precio</option>
    </Select>
  );
}
