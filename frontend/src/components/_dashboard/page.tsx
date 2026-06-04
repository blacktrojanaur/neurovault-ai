const DashboardClient = dynamicLoader(
  () => import('@/components/_dashboard/DashboardClient'), 
  { ssr: false }
);

export default function DashboardPage() {
  return <DashboardClient />;
}