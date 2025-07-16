export default function Footer() {
  return (
    <footer className="w-full bg-black border-t border-gray-800 text-gray-400 py-6 flex flex-col md:flex-row justify-between items-center px-8 mt-12">
      <div className="mb-2 md:mb-0">
        &copy; {new Date().getFullYear()} PixTrove. All rights reserved.
      </div>
      <div className="flex gap-6">
        <a href="/about" className="hover:text-indigo-400 transition">About</a>
        <a href="/contact" className="hover:text-indigo-400 transition">Contact</a>
        <a href="https://github.com/anubhav12302387/Event-Photo-Organizer-with-Face-Recognition" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition">GitHub</a>
      </div>
    </footer>
  );
}
