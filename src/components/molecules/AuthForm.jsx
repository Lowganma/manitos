import { useForm } from 'react-hook-form';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import { useAuthStore } from '../../stores/auth.store';

export default function AuthForm({ mode = 'login' }) {
  const { register, handleSubmit } = useForm();
  const { signIn, signUp } = useAuthStore();

  const onSubmit = async ({ email, password }) => {
    if (mode === 'login') await signIn(email, password);
    else await signUp(email, password);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input type="email" placeholder="Email" {...register('email')} required />
      <Input type="password" placeholder="Password" {...register('password')} required />
      <Button type="submit">{mode === 'login' ? 'Entrar' : 'Registrarse'}</Button>
    </form>
  );
}
