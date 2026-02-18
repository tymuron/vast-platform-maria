import { Outlet, Link, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { LogOut, User as UserIcon, Menu, X, Loader2, BookOpen, Library, Lock, ChevronDown, ChevronRight, Home, Smartphone } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../lib/utils';
import { useAuth } from '../../contexts/AuthContext';
import { useModules } from '../../hooks/useCourse';

export default function StudentLayout() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCourseExpanded, setIsCourseExpanded] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const { user, signOut, loading: authLoading } = useAuth();
    const { modules, loading: modulesLoading } = useModules();
    const displayName = user?.user_metadata?.full_name || user?.email || 'Teilnehmer';

    const searchParams = new URLSearchParams(location.search);
    const activeModuleId = searchParams.get('module');

    if (authLoading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-vastu-gold" size={40} /></div>;

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    const NavItem = ({ to, icon: Icon, label, isActive, onClick }: { to: string; icon: any; label: string; isActive: boolean; onClick?: () => void }) => (
        <Link
            to={to}
            onClick={onClick}
            className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all group",
                isActive
                    ? "bg-white/12 text-white font-medium shadow-sm"
                    : "text-white/60 hover:bg-white/5 hover:text-white/90"
            )}
        >
            <Icon size={20} className={cn("transition-colors", isActive ? "text-vastu-gold" : "text-white/40 group-hover:text-vastu-gold")} />
            <span className="font-sans text-sm">{label}</span>
        </Link>
    );

    return (
        <div className="min-h-screen bg-vastu-light md:bg-white">
            {/* Desktop Sidebar — Gradient with lotus watermark */}
            <aside
                className="hidden md:flex w-72 bg-sidebar-gradient text-white flex-col z-50 overflow-y-auto custom-scrollbar lotus-watermark"
                style={{ position: 'fixed', left: 0, top: 0, bottom: 0 }}
            >
                {/* Brand Header */}
                <div className="p-6 border-b border-white/8">
                    <Link to="/student/welcome" className="flex items-center gap-3 group">
                        {/* Decorative logo */}
                        <div className="w-11 h-11 rounded-full border-2 border-vastu-gold/60 flex items-center justify-center transition-transform group-hover:scale-110">
                            <span className="font-script text-vastu-gold text-2xl leading-none mt-0.5">V</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-serif text-[17px] tracking-[0.15em] text-white leading-none">VASTULOGIE</span>
                            <span className="font-script text-vastu-gold text-sm mt-1">Ausbildung</span>
                        </div>
                    </Link>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {/* Back to Welcome */}
                    <Link to="/student/welcome" className="flex items-center gap-2 px-4 py-2 text-white/40 hover:text-white/70 text-xs font-sans transition-colors mb-2">
                        <Home size={14} />
                        <span>← Startseite</span>
                    </Link>

                    {/* Module Navigation */}
                    <div>
                        <button
                            onClick={() => setIsCourseExpanded(!isCourseExpanded)}
                            className="w-full flex items-center justify-between px-4 py-3 text-white/60 hover:text-white transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <BookOpen size={20} className="text-white/40" />
                                <span className="font-sans text-sm font-medium">Mein Kurs</span>
                            </div>
                            {isCourseExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                        </button>

                        {isCourseExpanded && (
                            <div className="mt-1 ml-4 space-y-0.5 pl-4 border-l border-white/8">
                                {modulesLoading ? (
                                    <div className="px-4 py-2 text-xs text-white/30 font-sans">Laden...</div>
                                ) : (
                                    modules.map((mod) => {
                                        const isModActive = (activeModuleId === mod.id && location.pathname === '/student') ||
                                            location.pathname.includes(`/module/${mod.id}`);
                                        return (
                                            <button
                                                key={mod.id}
                                                onClick={() => {
                                                    if (!mod.isLocked) {
                                                        navigate(`/student?module=${mod.id}`);
                                                    }
                                                }}
                                                disabled={mod.isLocked}
                                                className={cn(
                                                    "w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm transition-all text-left group",
                                                    isModActive
                                                        ? "bg-vastu-gold/15 text-vastu-gold border-l-2 border-vastu-gold -ml-[1px]"
                                                        : mod.isLocked
                                                            ? "text-white/25 cursor-not-allowed"
                                                            : "text-white/55 hover:text-white hover:bg-white/5"
                                                )}
                                            >
                                                <div className="flex items-start gap-3 flex-1 min-w-0">
                                                    <div className={cn(
                                                        "w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors mt-1.5",
                                                        isModActive ? "bg-vastu-gold" : mod.isLocked ? "bg-white/15" : "bg-white/25"
                                                    )} />
                                                    <span className="whitespace-normal leading-tight break-words font-sans">{mod.title}</span>
                                                </div>
                                                {mod.isLocked && <Lock size={12} className="opacity-40" />}
                                            </button>
                                        );
                                    })
                                )}
                            </div>
                        )}
                    </div>

                    <NavItem
                        to="/student/library"
                        icon={Library}
                        label="Bibliothek"
                        isActive={location.pathname.includes('/library')}
                    />

                    <NavItem
                        to="/student/install"
                        icon={Smartphone}
                        label="App installieren"
                        isActive={location.pathname.includes('/install')}
                    />
                </nav>

                {/* User section */}
                <div className="p-4 border-t border-white/8">
                    <Link to="/student/profile" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group mb-2">
                        <div className="w-10 h-10 rounded-full bg-white/8 flex items-center justify-center text-white/60 group-hover:text-vastu-gold transition-colors border border-white/10">
                            <UserIcon size={18} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-sm font-sans font-medium text-white/90 truncate">{displayName}</div>
                            <div className="text-xs font-sans text-white/35">Teilnehmer</div>
                        </div>
                    </Link>
                    <button
                        onClick={() => signOut()}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm font-sans text-white/40 hover:text-white/70 transition-colors"
                    >
                        <LogOut size={16} />
                        <span>Abmelden</span>
                    </button>
                </div>
            </aside>

            {/* Mobile Header */}
            <header className="md:hidden bg-sidebar-gradient text-white fixed top-0 w-full z-50 shadow-md h-16 flex items-center justify-between px-4">
                <Link to="/student/welcome" className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full border-2 border-vastu-gold/60 flex items-center justify-center">
                        <span className="font-script text-vastu-gold text-xl leading-none mt-0.5">V</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-serif text-sm tracking-[0.12em] text-white leading-none">VASTULOGIE</span>
                        <span className="font-script text-vastu-gold text-xs">Ausbildung</span>
                    </div>
                </Link>
                <button
                    className="text-vastu-gold"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </header>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="bg-sidebar-gradient w-72 h-full shadow-2xl p-4 pt-20 overflow-y-auto pb-10 lotus-watermark" onClick={e => e.stopPropagation()}>
                        <nav className="space-y-2">
                            <Link to="/student/welcome" onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center gap-2 px-4 py-2 text-white/40 hover:text-white/70 text-xs font-sans transition-colors mb-2">
                                <Home size={14} />
                                <span>← Startseite</span>
                            </Link>

                            <div className="mb-4">
                                <div className="text-xs font-sans uppercase tracking-widest text-white/35 mb-2 px-4">Mein Kurs</div>
                                {modules.map((mod) => (
                                    <button
                                        key={mod.id}
                                        onClick={() => {
                                            if (!mod.isLocked) {
                                                navigate(`/student?module=${mod.id}`);
                                                setIsMobileMenuOpen(false);
                                            }
                                        }}
                                        disabled={mod.isLocked}
                                        className={cn(
                                            "w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm transition-all text-left font-sans",
                                            activeModuleId === mod.id && location.pathname === '/student'
                                                ? "bg-vastu-gold/15 text-vastu-gold"
                                                : mod.isLocked
                                                    ? "text-white/25 cursor-not-allowed"
                                                    : "text-white/60"
                                        )}
                                    >
                                        <span className="whitespace-normal leading-tight">{mod.title}</span>
                                        {mod.isLocked && <Lock size={12} />}
                                    </button>
                                ))}
                            </div>

                            <div className="border-t border-white/8 pt-4">
                                <NavItem
                                    to="/student/library"
                                    icon={Library}
                                    label="Bibliothek"
                                    isActive={location.pathname.includes('/library')}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                />
                                <NavItem
                                    to="/student/install"
                                    icon={Smartphone}
                                    label="App installieren"
                                    isActive={location.pathname.includes('/install')}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                />
                            </div>
                        </nav>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main className="flex-1 md:ml-72 min-h-screen pt-16 md:pt-0">
                <div className="px-4 py-4 md:px-6 md:py-6">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
