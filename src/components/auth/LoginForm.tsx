export default function LoginForm() {
  return (
    <form className='space-y-2'>
      <input type='email' placeholder='Email' className='border p-2' />
      <input type='password' placeholder='Password' className='border p-2' />
      <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded'>
        Login
      </button>
    </form>
  );
}
