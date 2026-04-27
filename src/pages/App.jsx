import { useUser } from '@clerk/clerk-react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

export default function AppPage() {
  const { user } = useUser();
  const dbUser = useQuery(
    api.users.getByEmail,
    user?.primaryEmailAddress?.emailAddress
      ? { email: user.primaryEmailAddress.emailAddress }
      : 'skip'
  );

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-medium">
        Hello, {user?.firstName ?? 'there'}!
      </h1>
      <p className="text-gray-600">
        {dbUser ? `Convex says: ${dbUser.email}` : 'Waiting for Convex sync…'}
      </p>
    </main>
  );
}
