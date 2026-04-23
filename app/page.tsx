import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Strip from '@/components/Strip';
import About from '@/components/About';
import Reviews from '@/components/Reviews';
import Location from '@/components/Location';
import BookCta from '@/components/BookCta';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Strip />
        <About />
        <Reviews />
        <Location />
        <BookCta />
      </main>
      <Footer />
    </>
  );
}