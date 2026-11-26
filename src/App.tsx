import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { DesignSystemPreview } from '@/preview/DesignSystemPreview';

/**
 * STEP 02: only the design-system preview is mounted.
 * Real pages and routes are added in a later step.
 */
export function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Header collectionCount={3} />
      <main className="pt-header">
        <Routes>
          <Route path="*" element={<DesignSystemPreview />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
