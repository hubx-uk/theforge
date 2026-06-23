import Navbar from './Navbar';
import Footer from './Footer';

export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main style={{ background: 'var(--bg-base)', minHeight: '100vh' }}>
        {children}
      </main>
      <Footer />
    </>
  );
}
