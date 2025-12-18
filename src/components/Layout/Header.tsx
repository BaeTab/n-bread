
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { name: '홈', path: '/' },
        { name: '계산기', path: '/calculator' },
        { name: '사용가이드', path: '/guide' },
        { name: '블로그', path: '/blog' },
    ];

    return (
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
                <Link to="/" className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                    <span>🧾 N-BREAD</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-1">
                    {navItems.map(item => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={clsx(
                                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                                location.pathname === item.path
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-gray-600"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Nav */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-gray-100 bg-white px-4 py-2 shadow-lg">
                    {navItems.map(item => (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsMenuOpen(false)}
                            className={clsx(
                                "block px-4 py-3 rounded-lg text-base font-medium transition-colors mb-1",
                                location.pathname === item.path
                                    ? "bg-gray-50 text-gray-900"
                                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            )}
        </header>
    );
}
