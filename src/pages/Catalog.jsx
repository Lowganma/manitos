import { useState } from 'react';
import useCourses from '../hooks/useCourses';
import CourseGrid from '../components/organisms/CourseGrid';
import SearchBar from '../components/molecules/SearchBar';
import SortMenu from '../components/molecules/SortMenu';

export default function Catalog() {
  const [params, setParams] = useState({});
  const { data } = useCourses(params);
  return (
    <div>
      <SearchBar onSearch={(text) => setParams((p) => ({ ...p, text }))} />
      <SortMenu onSort={(order) => setParams((p) => ({ ...p, order }))} />
      <CourseGrid courses={data || []} />
    </div>
  );
}
