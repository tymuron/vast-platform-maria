import { ExternalLink, Play, Calendar, Video, MessageCircle, Star, ArrowRight, BookOpen, Library, Smartphone, LogOut } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function WelcomePage() {
    const { user, signOut, loading } = useAuth();
    const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Teilnehmer';

    if (loading) return null;
    if (!user) return <Navigate to="/login" replace />;

    return (
        <div className="min-h-screen bg-vastu-light">
            {/* Top navigation bar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-vastu-sand/40">
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link to="/student/welcome" className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full border-2 border-vastu-dark/25 flex items-center justify-center">
                            <span className="font-script text-vastu-dark text-2xl leading-none mt-0.5">V</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-serif text-sm tracking-[0.12em] text-vastu-dark leading-none">VASTULOGIE</span>
                            <span className="font-script text-vastu-gold text-xs">Ausbildung</span>
                        </div>
                    </Link>
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-sans text-vastu-text-light hidden sm:block">{displayName}</span>
                        <button onClick={() => signOut()} className="text-vastu-text-light hover:text-vastu-dark transition-colors">
                            <LogOut size={18} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero — Full-screen */}
            <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
                {/* Background layers */}
                <div className="absolute inset-0 bg-[#2a1f18]" />
                <div className="absolute inset-0 grain-overlay opacity-30" />
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-vastu-gold/8 rounded-full blur-[150px] translate-x-1/4 -translate-y-1/4" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-vastu-accent/5 rounded-full blur-[120px] -translate-x-1/4 translate-y-1/4" />

                <div className="relative z-10 text-center text-white px-6 max-w-3xl mx-auto">
                    <p className="font-script text-vastu-gold text-3xl md:text-5xl mb-4 animate-fade-in">Willkommen, {displayName}</p>
                    <h1 className="text-5xl md:text-8xl font-serif tracking-[0.12em] mb-3 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                        VASTULOGIE
                    </h1>
                    <p className="font-script text-vastu-gold/80 text-xl md:text-2xl mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>Ausbildung 2026</p>

                    {/* Ornament */}
                    <div className="flex items-center justify-center gap-4 mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                        <div className="w-20 h-px bg-gradient-to-r from-transparent to-vastu-gold/50" />
                        <Star size={14} className="text-vastu-gold/70" />
                        <div className="w-20 h-px bg-gradient-to-l from-transparent to-vastu-gold/50" />
                    </div>

                    <p className="text-white/60 font-body text-lg md:text-xl leading-relaxed mb-10 max-w-xl mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
                        Dein Weg zu einem harmonischen Zuhause beginnt hier. Entdecke die Kraft von Vastu
                        und verwandle dein Leben durch bewusstes Raumdesign.
                    </p>

                    {/* CTA */}
                    <Link
                        to="/student"
                        className="inline-flex items-center gap-3 bg-vastu-gold text-[#2a1f18] px-8 py-4 rounded-full font-sans font-semibold text-lg hover:bg-vastu-gold/90 transition-all shadow-xl shadow-black/30 hover:shadow-2xl hover:scale-[1.02] animate-fade-in"
                        style={{ animationDelay: '0.5s' }}
                    >
                        Zum Kurs
                        <ArrowRight size={20} />
                    </Link>
                </div>

                {/* Scroll hint */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/25 text-xs font-sans flex flex-col items-center gap-2 animate-fade-in" style={{ animationDelay: '0.8s' }}>
                    <span>Mehr erfahren</span>
                    <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
                </div>
            </section>

            {/* Content Sections Below the Fold */}
            <section className="max-w-5xl mx-auto px-6 py-16 space-y-12">

                {/* Welcome Video */}
                <div className="bg-white rounded-2xl shadow-sm border border-vastu-sand/50 overflow-hidden">
                    <div className="p-6 md:p-8">
                        <h3 className="font-serif text-2xl text-vastu-dark mb-1 flex items-center gap-2">
                            <Play className="text-vastu-gold" size={22} />
                            Begrüßungsvideo
                        </h3>
                        <p className="text-vastu-text-light font-body text-base mb-5">Schau dir das Einführungsvideo an, bevor du startest.</p>
                        <div className="vimeo-wrapper">
                            <iframe
                                src="https://player.vimeo.com/video/placeholder"
                                allow="autoplay; fullscreen; picture-in-picture"
                                allowFullScreen
                                title="Willkommen"
                            />
                        </div>
                    </div>
                </div>

                {/* Info Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Schedule — Timeline */}
                    <div className="bg-white rounded-2xl shadow-sm border border-vastu-sand/50 p-6 md:p-8">
                        <h3 className="font-serif text-xl text-vastu-dark mb-2 flex items-center gap-2">
                            <Calendar className="text-vastu-gold" size={20} />
                            Unsere Treffen
                        </h3>
                        <p className="text-vastu-text-light font-body text-sm mb-5">Jeden Mittwoch um 9 Uhr (inkl. Aufzeichnung)</p>

                        <div className="relative pl-6">
                            <div className="absolute left-[9px] top-2 bottom-2 w-px bg-vastu-sand" />
                            {[
                                { label: 'Modul 1', date: '20.03 (Freitag)', active: true },
                                { label: 'Modul 2', date: '25.03' },
                                { label: 'Modul 3', date: '01.04' },
                                { label: 'Modul 4', date: '08.04' },
                                { label: 'Modul 5', date: '15.04' },
                                { label: 'Modul 6', date: '22.04' },
                                { label: 'Modul 7', date: '29.04' },
                            ].map((item, i) => (
                                <div key={i} className="relative flex items-center gap-4 py-2">
                                    <div className={`absolute left-[-15px] w-[7px] h-[7px] rounded-full ${item.active ? 'bg-vastu-gold ring-4 ring-vastu-gold/20' : 'bg-vastu-sand'}`} />
                                    <span className="font-sans text-sm font-medium text-vastu-dark">{item.label}</span>
                                    <span className="text-vastu-text-light font-sans text-xs ml-auto">{item.date}</span>
                                </div>
                            ))}
                            <div className="relative flex items-center gap-4 py-2 mt-2 border-t border-vastu-sand/50 pt-3">
                                <div className="absolute left-[-15px] w-[7px] h-[7px] rounded-full bg-vastu-gold ring-4 ring-vastu-gold/15" />
                                <span className="font-serif text-sm font-medium text-vastu-dark">✨ Abschlussball</span>
                                <span className="text-vastu-dark font-sans text-xs font-semibold ml-auto">21.06</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <a href="#" target="_blank" rel="noopener noreferrer"
                            className="block bg-white rounded-2xl shadow-sm border border-vastu-sand/50 p-5 hover:shadow-md hover:border-vastu-gold/30 transition-all group">
                            <div className="flex items-center gap-4">
                                <div className="w-[52px] h-[52px] rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors shrink-0">
                                    <Video className="text-blue-600" size={26} />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-serif text-lg text-vastu-dark">Zoom Meeting</h4>
                                    <p className="text-vastu-text-light font-body text-sm">Klicke hier, um dem Live-Meeting beizutreten</p>
                                </div>
                                <ExternalLink size={18} className="text-vastu-sand group-hover:text-vastu-dark transition-colors shrink-0" />
                            </div>
                        </a>

                        <a href="#" target="_blank" rel="noopener noreferrer"
                            className="block bg-white rounded-2xl shadow-sm border border-vastu-sand/50 p-5 hover:shadow-md hover:border-vastu-gold/30 transition-all group">
                            <div className="flex items-center gap-4">
                                <div className="w-[52px] h-[52px] rounded-xl bg-sky-50 flex items-center justify-center group-hover:bg-sky-100 transition-colors shrink-0">
                                    <MessageCircle className="text-sky-500" size={26} />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-serif text-lg text-vastu-dark">Telegram Kanal</h4>
                                    <p className="text-vastu-text-light font-body text-sm">Fragen, Austausch & Community</p>
                                </div>
                                <ExternalLink size={18} className="text-vastu-sand group-hover:text-vastu-dark transition-colors shrink-0" />
                            </div>
                        </a>

                        <Link to="/student"
                            className="block bg-vastu-dark grain-overlay rounded-2xl shadow-lg shadow-vastu-dark/15 p-5 hover:shadow-xl transition-all group text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-vastu-gold opacity-10 rounded-full blur-[60px] translate-x-1/3 -translate-y-1/3" />
                            <div className="flex items-center gap-4 relative z-10">
                                <div className="w-[52px] h-[52px] rounded-xl bg-vastu-gold/20 flex items-center justify-center group-hover:bg-vastu-gold/30 transition-colors shrink-0">
                                    <Play className="text-vastu-gold" size={26} />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-serif text-lg text-vastu-gold">Kurs starten</h4>
                                    <p className="text-white/50 font-body text-sm">Direkt zum ersten Modul</p>
                                </div>
                                <ArrowRight className="text-vastu-gold/50 group-hover:text-vastu-gold transition-colors" size={20} />
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Bottom navigation cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { to: '/student', icon: BookOpen, label: 'Mein Kurs', desc: 'Module & Lektionen' },
                        { to: '/student/library', icon: Library, label: 'Bibliothek', desc: 'Materialien' },
                        { to: '/student/install', icon: Smartphone, label: 'App installieren', desc: 'Anleitung' },
                        { to: '/student/profile', icon: Star, label: 'Profil', desc: 'Einstellungen' },
                    ].map((item) => (
                        <Link
                            key={item.to}
                            to={item.to}
                            className="bg-white rounded-xl border border-vastu-sand/50 p-5 text-center hover:shadow-md hover:border-vastu-gold/30 transition-all group"
                        >
                            <item.icon className="mx-auto mb-2 text-vastu-dark group-hover:text-vastu-gold transition-colors" size={24} />
                            <h4 className="font-serif text-sm font-medium text-vastu-dark">{item.label}</h4>
                            <p className="text-xs font-sans text-vastu-text-light mt-0.5">{item.desc}</p>
                        </Link>
                    ))}
                </div>

                {/* Instructional Videos */}
                <div className="bg-white rounded-2xl shadow-sm border border-vastu-sand/50 p-6 md:p-8">
                    <h3 className="font-serif text-xl text-vastu-dark mb-4">📋 Hilfreiche Anleitungen</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-vastu-cream rounded-xl p-5 border border-vastu-sand/30 accent-bar-left">
                            <h4 className="font-serif font-medium text-vastu-dark mb-1">Vimeo Untertitel nutzen</h4>
                            <p className="text-sm font-body text-vastu-text-light">Erfahre, wie du Untertitel in Vimeo aktivierst und anpasst.</p>
                        </div>
                        <div className="bg-vastu-cream rounded-xl p-5 border border-vastu-sand/30 accent-bar-left">
                            <h4 className="font-serif font-medium text-vastu-dark mb-1">App auf dem Handy installieren</h4>
                            <p className="text-sm font-body text-vastu-text-light">
                                <Link to="/student/install" className="text-vastu-dark underline underline-offset-4 hover:text-vastu-gold transition-colors">
                                    Hier klicken für die Anleitung →
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-vastu-sand/50 py-8 text-center">
                <p className="text-sm font-sans text-vastu-text-light">© 2026 Vastulogie. Alle Rechte vorbehalten.</p>
            </footer>
        </div>
    );
}
