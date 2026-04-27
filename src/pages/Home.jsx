import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-medium">Welcome to __APP_NAME__</h1>
      <p className="text-gray-600">__IDEA_DESCRIPTION__</p>
      <div className="flex gap-3">
        <Link to="/sign-in" className="underline">Sign in</Link>
        <Link to="/sign-up" className="underline">Sign up</Link>
      </div>
    </main>
  );
}
