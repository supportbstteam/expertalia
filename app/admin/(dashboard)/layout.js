import Header from '@/components/admin/header/Header';
import Footer from '@/components/admin/footer/Footer';
import Sidebar from '@/components/admin/sidebar/Sidebar';

export default function Dashboard_layout({ children }) {
  return (
    <>    
      <Header />
      <Sidebar />
      <main id="main" className="ml-64">
      {children} 
      </main>  
      <Footer />  
    </>
  );
}
