import Head from 'next/head';
import Link from 'next/link';

const heroImg = '/premium_photo-1731442837021-3929f70e1710.jpg';
const galleryImages = [
  '/360_F_44851499_t44kwfA1Yn6UwAQEV3o65zK1ZeXMIHI1.jpg',
  '/infobank-picture-style-1-neutral_a741c8cee8f24f6496b81d45c07ee4a8.jpg',
  '/istockphoto-157373207-612x612.jpg',
  '/istockphoto-690008456-612x612.jpg',
  '/phonepicutres-TA.webp',
];

import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Head>
        <title>PixTrove - Effortless Event Photo Organization</title>
      </Head>
      <main className="min-h-screen flex flex-col bg-black text-white">
        {/* Hero Section */}
        <section className="w-full flex flex-col items-center justify-center px-6 pt-24 pb-12 md:pt-32 bg-black">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white tracking-tight text-center">Effortless Event Photo Organization</h1>
          <p className="mb-8 text-lg max-w-xl text-gray-300 text-center">Let PixTrove sort and deliver event memories, beautifully and automatically. Powered by AI face recognition and cloud magic.</p>
          <Link href="/register" className="px-8 py-3 rounded-full bg-cyan-500 text-black font-semibold hover:bg-cyan-400 transition mb-8">Get Started</Link>
          <img src={heroImg} alt="Event Memories" className="rounded-2xl w-[320px] md:w-[400px] h-auto object-cover border border-gray-800 shadow-sm mt-6" />
        </section>

        {/* Gallery Section */}
        <section className="py-12 bg-black">
          <h2 className="text-xl font-semibold text-center mb-6 text-gray-200">Recent Event Moments</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 justify-center items-center max-w-4xl mx-auto">
            {galleryImages.map((img, i) => (
              <img key={i} src={img} alt={`Gallery ${i+1}`} className="rounded-lg w-full h-36 object-cover border border-gray-800 bg-gray-900" />
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-14 bg-black flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-8 text-gray-200">How PixTrove Works</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-3xl">
            <div className="flex flex-col items-center">
              <span className="text-2xl mb-2">📸</span>
              <p className="text-center text-gray-400 text-sm">Upload your selfie</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl mb-2">🎞️</span>
              <p className="text-center text-gray-400 text-sm">Cameraman uploads photos</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl mb-2">🤖</span>
              <p className="text-center text-gray-400 text-sm">AI organizes by faces</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl mb-2">⬇️</span>
              <p className="text-center text-gray-400 text-sm">Download your memories</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function ScreenshotCard({ src, label }) {
  return (
    <div className="bg-[#393053] rounded-lg p-4 shadow-lg flex flex-col items-center w-64">
      <img src={src} alt={label} className="rounded mb-2 h-40 object-cover w-full" />
      <span className="text-base text-gray-200">{label}</span>
    </div>
  );
}

function BenefitCard({ title, desc }) {
  return (
    <div className="bg-[#393053] rounded-lg p-6 shadow-lg flex flex-col items-center">
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-gray-300 text-center text-sm">{desc}</p>
    </div>
  );
}
