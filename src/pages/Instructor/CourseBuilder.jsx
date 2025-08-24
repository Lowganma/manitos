import { useParams } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import Input from '../../components/atoms/Input';
import TextArea from '../../components/atoms/TextArea';
import Button from '../../components/atoms/Button';
import { supabase } from '../../services/supabaseClient';
import { useAuthStore } from '../../stores/auth.store';

export default function CourseBuilder() {
  const { id } = useParams();
  const user = useAuthStore((s) => s.user);
  const { register, handleSubmit, control, reset } = useForm({ defaultValues: { sections: [] } });
  const { fields, append, remove } = useFieldArray({ control, name: 'sections' });

  const onSubmit = async (values) => {
    if (id === 'new') {
      const { data } = await supabase
        .from('courses')
        .insert({ title: values.title, description: values.description, instructor_id: user.id })
        .select()
        .single();
      for (const [index, s] of values.sections.entries()) {
        await supabase.from('sections').insert({ course_id: data.id, title: s.title, position: index + 1 });
      }
    } else {
      await supabase.from('courses').update({ title: values.title, description: values.description }).eq('id', id);
    }
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input placeholder="Título" {...register('title')} required />
      <TextArea placeholder="Descripción" {...register('description')} />
      <div>
        <h3>Secciones</h3>
        {fields.map((field, index) => (
          <div key={field.id}>
            <Input placeholder="Título" {...register(`sections.${index}.title`)} />
            <Button type="button" onClick={() => remove(index)}>
              Eliminar
            </Button>
          </div>
        ))}
        <Button type="button" onClick={() => append({ title: '' })}>
          Añadir sección
        </Button>
      </div>
      <Button type="submit">Guardar</Button>
    </form>
  );
}
