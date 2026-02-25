import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { LogOut, Layout, Users, Loader2, FileText } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAuth } from '../../contexts/AuthContext';

export default function TeacherLayout() {
    const location = useLocation();
    const { user, role, loading, signOut } = useAuth();

    if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-vastu-dark" size={40} /></div>;

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (role !== 'teacher') {
        return <Navigate to="/student" replace />;
    }

    const navItems = [
        { path: '/teacher', label: 'Kurs', icon: Layout },
        { path: '/teacher/students', label: 'Teilnehmer', icon: Users },
        { path: '/teacher/library', label: 'Bibliothek', icon: FileText },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <aside className="w-64 bg-vastu-dark text-vastu-light flex flex-col fixed h-full z-20">
                <div className="p-6 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-vastu-accent rounded-full flex items-center justify-center text-vastu-dark font-serif font-bold text-lg">V</div>
                        <span className="font-serif text-xl tracking-wide text-vastu-accent">ADMIN</span>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                                location.pathname === item.path
                                    ? "bg-vastu-accent text-vastu-dark"
                                    : "text-vastu-light/70 hover:text-vastu-light hover:bg-white/5"
                            )}
                        >
                            <item.icon size={18} />
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/10">
                    <button
                        onClick={() => signOut()}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-vastu-light/70 hover:text-vastu-light hover:bg-white/5 transition-colors"
                    >
                        <LogOut size={18} />
                        Abmelden
                    </button>
                </div>
            </aside>

            <main className="flex-1 ml-64 p-8">
                <Outlet />
            </main>
        </div>
    );
}
