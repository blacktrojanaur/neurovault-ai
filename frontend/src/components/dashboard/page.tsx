// 1. Rename the import to avoid conflict with the variable below
import dynamicLoader from 'next/dynamic';

// 2. This variable name must be exactly 'dynamic' for Next.js to recognize it
export const dynamic = 'force-dynamic';

// 3. Use the renamed loader here
const DashboardClient = dynamicLoader(
  () => import('@/components/dashboard/DashboardClient'), 
  { ssr: false }
);

export default function DashboardPage() {
  return <DashboardClient />;
}