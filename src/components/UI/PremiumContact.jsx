export default function PremiumContact() {
  return (
    <section className="relative z-10 w-full min-h-[80vh] flex flex-col items-center justify-center bg-dark text-white font-sans px-6 text-center">
      
      <p className="font-mono text-sm tracking-[0.3em] text-gray-500 mb-8 uppercase">
        // Next Steps
      </p>
      
      <h2 className="text-5xl md:text-[6rem] font-medium tracking-tighter leading-none mb-12">
        Let's build <br />
        <span className="text-gray-500 italic">something great.</span>
      </h2>

      <a 
        href="mailto:disha.devgirkar@example.com" 
        className="group relative inline-flex items-center justify-center gap-4 bg-white text-dark px-10 py-5 rounded-full text-lg font-medium tracking-wide hover:bg-gray-200 transition-all duration-300 hover:scale-105"
      >
        <span>Get in touch</span>
        <span className="group-hover:translate-x-1 transition-transform">→</span>
      </a>

    </section>
  );
}