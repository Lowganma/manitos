import { useState } from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

export default function SearchBar({ onSearch }) {
  const [text, setText] = useState('');
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(text);
      }}
    >
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Buscar cursos"
        aria-label="search"
      />
      <Button type="submit">Buscar</Button>
    </form>
  );
}
