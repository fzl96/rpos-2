/* eslint-disable no-console */
import Loaders from '@/components/ui/loading-icon';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import PulseLoader from 'react-spinners/PulseLoader';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [loginLoading, setLoginLoading] = useState(false);

  const { user, loading } = useAuth();

  useEffect(() => {
    document.title = 'POS - Login';
  }, []);

  if (loading) {
    return <Loaders />;
  }

  if (user) {
    return <Navigate to="/" />;
  }

  console.log(`error : ${error}`);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError('');

    try {
      setLoginLoading(true);
      await signIn(email, password);
      setLoginLoading(false);
      navigate('/');
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      console.log(err);
      setLoginLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#F6F5FA]">
      <div className="md:w-[25rem] w-[80%] bg-white h-[27rem] rounded-3xl shadow-lg flex flex-col items-center gap-5 pt-20">
        <h1 className="text-3xl font-bold">Login</h1>
        <form
          className="flex flex-col gap-3 w-full px-10 "
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            className="bg-[#F6F5FA] text-lg outline-none px-8 px-8 py-4 rounded-xl"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
          />
          <input
            type="password"
            className="bg-[#F6F5FA] text-lg outline-none px-8 py-4 rounded-xl"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
              setError('');
            }}
          />
          <button
            type="submit"
            className="bg-[#111827] text-white text-lg font-semibold outline-none px-10 py-4 rounded-xl"
          >
            {loginLoading ? <PulseLoader color="white" /> : 'Sign In'}
          </button>
          <p className="text-center text-base text-red-500">
            {error && 'Invalid email/password'}
          </p>
        </form>
      </div>
    </div>
  );
}
export default Login;
