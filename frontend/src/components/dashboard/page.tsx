import dynamic from 'next/dynamic';

// We import the component from the location in your screenshot
// ssr: false forces it to only load in the browser
const DashboardClient = dynamic(() => import('@/components/dashboard/DashboardClient'), { 
  ssr: false 
});

export default function DashboardPage() {
  return <DashboardClient />;
}