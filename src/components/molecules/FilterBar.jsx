import Select from '../atoms/Select';

export default function FilterBar({ categories = [], onFilter }) {
  return (
    <Select onChange={(e) => onFilter(e.target.value)} aria-label="category">
      <option value="">Todas</option>
      {categories.map((c) => (
        <option key={c.id} value={c.id}>
          {c.name}
        </option>
      ))}
    </Select>
  );
}
