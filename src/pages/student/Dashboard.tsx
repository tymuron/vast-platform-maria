import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Play, ChevronRight, FileText, Loader2, CheckCircle2, Download } from 'lucide-react';
import { useEffect } from 'react';
import { useModules } from '../../hooks/useCourse';

const stripHtml = (html: string) => {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
};

// Extract module number for decorative badge
function getModuleNumber(id: string): string {
    if (id === 'pre') return '✦';
    if (id === 'bonus') return '★';
    const match = id.match(/m(\d+)/);
    return match ? match[1].padStart(2, '0') : '';
}

export default function StudentDashboard() {
    const { modules, loading } = useModules();
    const location = useLocation();
    const navigate = useNavigate();

    const searchParams = new URLSearchParams(location.search);
    const activeModuleId = searchParams.get('module');

    useEffect(() => {
        if (!loading && modules.length > 0) {
            const isValidModule = modules.some(m => m.id === activeModuleId);
            if (!activeModuleId || !isValidModule) {
                const firstUnlocked = modules.find(m => !m.isLocked);
                const targetId = firstUnlocked?.id || modules[0].id;
                navigate(`/student?module=${targetId}`, { replace: true });
            }
        }
    }, [modules, loading, activeModuleId, navigate]);

    if (loading) {
        return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-vastu-gold" size={40} /></div>;
    }

    const activeMod = modules.find(m => m.id === activeModuleId);
    if (!activeMod) return null;

    const completedCount = activeMod.lektionen.filter(l => l.isCompleted).length;
    const totalCount = activeMod.lektionen.length;
    const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
    const moduleNum = getModuleNumber(activeMod.id);

    return (
        <div className="animate-fade-in">
            <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-vastu-sand/50 overflow-hidden min-h-[calc(100vh-5rem)]">
                {/* Module Header — grain texture + decorative module number */}
                <div className="bg-vastu-dark grain-overlay p-6 md:p-8 text-white relative overflow-hidden">
                    {/* Decorative module number background */}
                    <div className="module-number-bg">{moduleNum}</div>

                    {/* Blur orb */}
                    <div className="absolute top-0 right-0 w-80 h-80 bg-vastu-gold opacity-8 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3" />

                    <div className="relative z-10">
                        {/* Module label pill */}
                        {activeMod.id !== 'pre' && activeMod.id !== 'bonus' && (
                            <span className="inline-block px-3 py-1 bg-vastu-gold/15 text-vastu-gold text-xs font-sans font-medium rounded-full mb-3 tracking-wide uppercase">
                                Modul {moduleNum}
                            </span>
                        )}

                        <h2 className="text-2xl md:text-4xl font-serif mb-3">{activeMod.title}</h2>
                        <p className="text-white/50 max-w-2xl font-body leading-relaxed text-base mb-4">
                            {stripHtml(activeMod.description || '')}
                        </p>

                        {/* Progress Bar — with glow */}
                        {totalCount > 0 && (
                            <div className="max-w-md">
                                <div className="flex justify-between text-sm font-sans mb-2">
                                    <span className="text-white/45">Fortschritt</span>
                                    <span className="text-vastu-gold font-medium">{completedCount}/{totalCount} Lektionen</span>
                                </div>
                                <div className={`h-2 bg-white/10 rounded-full overflow-hidden ${progressPercent > 0 ? 'progress-glow active' : ''}`}>
                                    <div
                                        className="h-full bg-gradient-to-r from-vastu-gold to-vastu-accent rounded-full transition-all duration-700 ease-out"
                                        style={{ width: `${progressPercent}%` }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-5 md:p-6">
                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Lessons List — with left accent bars */}
                        <div className="md:col-span-2 space-y-4">
                            <h3 className="font-serif text-lg text-vastu-dark mb-3 flex items-center gap-2">
                                <Play className="text-vastu-gold" size={20} />
                                Lektionen
                            </h3>

                            {activeMod.lektionen.length === 0 ? (
                                <div className="text-center py-6 text-vastu-text-light">
                                    <p className="text-lg font-body mb-2">Noch keine Lektionen verfügbar</p>
                                    <p className="text-sm font-sans">Die Inhalte werden bald freigeschaltet.</p>
                                </div>
                            ) : (
                                <div className="space-y-3 animate-stagger">
                                    {activeMod.lektionen.map((lektion) => (
                                        <Link
                                            key={lektion.id}
                                            to={`/student/module/${activeMod.id}/lektion/${lektion.id}`}
                                            className={`flex items-center justify-between p-4 rounded-xl border transition-all group relative overflow-hidden ${lektion.isCompleted
                                                ? 'border-green-200 bg-green-50/30 hover:bg-green-50/60'
                                                : 'border-vastu-sand/50 hover:border-vastu-gold/40 hover:bg-vastu-cream/50'
                                                }`}
                                        >
                                            {/* Left accent bar */}
                                            <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl transition-colors ${lektion.isCompleted ? 'bg-green-400' : 'bg-vastu-sand/50 group-hover:bg-vastu-gold'
                                                }`} />

                                            <div className="flex items-center gap-4 pl-2">
                                                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-all ${lektion.isCompleted
                                                    ? 'bg-green-100 text-green-600'
                                                    : 'bg-vastu-cream text-vastu-dark group-hover:bg-vastu-dark group-hover:text-white'
                                                    }`}>
                                                    {lektion.isCompleted ? (
                                                        <CheckCircle2 size={18} />
                                                    ) : (
                                                        <Play size={14} fill="currentColor" />
                                                    )}
                                                </div>
                                                <div>
                                                    <h4 className="font-serif font-medium text-vastu-dark group-hover:text-vastu-dark transition-colors">
                                                        {lektion.title}
                                                    </h4>
                                                    {lektion.description && (
                                                        <p className="text-xs font-body text-vastu-text-light line-clamp-2 mt-0.5">
                                                            {stripHtml(lektion.description)}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <ChevronRight size={18} className="text-vastu-sand group-hover:text-vastu-dark transition-colors shrink-0" />
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Materials Sidebar */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-serif text-lg text-vastu-dark mb-3 flex items-center gap-2">
                                    <FileText className="text-vastu-gold" size={20} />
                                    Materialien
                                </h3>
                                <div className="bg-vastu-cream/60 rounded-xl p-4 border border-vastu-sand/30 space-y-3">
                                    {activeMod.moduleMaterials && activeMod.moduleMaterials.length > 0 ? (
                                        activeMod.moduleMaterials.map((material) => (
                                            <a
                                                key={material.id}
                                                href={material.url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-white transition-colors group"
                                            >
                                                <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center shrink-0 group-hover:bg-red-100 transition-colors">
                                                    <FileText size={14} className="text-red-500" />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <div className="text-sm font-serif font-medium text-vastu-dark truncate group-hover:text-vastu-gold transition-colors">
                                                        {material.title}
                                                    </div>
                                                    <div className="text-[10px] font-sans text-vastu-text-light uppercase">
                                                        {material.type}
                                                    </div>
                                                </div>
                                                <Download size={14} className="text-vastu-sand group-hover:text-vastu-dark transition-colors mt-1 shrink-0" />
                                            </a>
                                        ))
                                    ) : (
                                        <div className="text-sm font-body text-vastu-text-light italic text-center py-4">
                                            Keine zusätzlichen Materialien
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
