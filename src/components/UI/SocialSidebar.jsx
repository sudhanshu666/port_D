import Magnetic from './Magnetic';

export default function SocialSidebar() {
  const links = [
    { name: 'LN', url: '#' },
    { name: 'GH', url: '#' },
    { name: 'TW', url: '#' },
    { name: 'IG', url: '#' },
  ];

  return (
    <div className="fixed left-8 bottom-12 z-50 hidden md:flex flex-col gap-8 font-mono text-[10px] tracking-widest text-gray-500">
      {links.map((link) => (
        <Magnetic key={link.name}>
          <a 
            href={link.url} 
            className="hover:text-white transition-colors p-2 cursor-pointer"
          >
            {link.name}
          </a>
        </Magnetic>
      ))}
      <div className="w-[1px] h-12 bg-white/20 self-center mt-2" />
    </div>
  );
}