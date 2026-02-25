import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Loader2, Search, Mail, User } from 'lucide-react';

interface StudentProfile {
    id: string;
    email: string;
    full_name: string | null;
    created_at: string;
}

export default function Students() {
    const [students, setStudents] = useState<StudentProfile[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        async function fetchStudents() {
            try {
                if (!import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL.includes('placeholder')) {
                    setStudents([
                        { id: '1', full_name: 'Anna Schneider', email: 'anna@beispiel.de', created_at: '2026-02-10T10:00:00Z' },
                        { id: '2', full_name: 'Lisa Müller', email: 'lisa@beispiel.de', created_at: '2026-02-12T14:30:00Z' },
                        { id: '3', full_name: 'Sophie Wagner', email: 'sophie@beispiel.de', created_at: '2026-02-15T09:15:00Z' },
                        { id: '4', full_name: 'Julia Fischer', email: 'julia@beispiel.de', created_at: '2026-02-18T11:45:00Z' },
                    ]);
                    setLoading(false);
                    return;
                }

                const { data, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('role', 'student')
                    .order('created_at', { ascending: false });

                if (error) throw error;
                setStudents(data || []);
            } catch (error) {
                console.error('Error fetching students:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchStudents();
    }, []);

    if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-vastu-dark" size={40} /></div>;

    const inviteLink = `${window.location.origin}/register`;

    const copyLink = () => {
        navigator.clipboard.writeText(inviteLink);
        alert('Link wurde kopiert!');
    };

    const filtered = students.filter(s =>
        (s.full_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="max-w-5xl mx-auto animate-fade-in">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-serif text-vastu-dark">Teilnehmer</h1>
                <button
                    onClick={copyLink}
                    className="flex items-center gap-2 bg-vastu-accent/10 text-vastu-dark border border-vastu-accent/30 px-4 py-2 rounded-lg hover:bg-vastu-accent/20 transition-colors"
                >
                    <Mail size={18} />
                    Einladungslink kopieren
                </button>
            </div>

            {/* Invite Card */}
            <div className="bg-white p-6 rounded-xl border border-vastu-accent/20 shadow-sm mb-8 flex items-center justify-between">
                <div>
                    <h3 className="font-medium text-vastu-dark mb-1">Registrierungslink für Teilnehmer</h3>
                    <p className="text-sm text-gray-500">Sende diesen Link an Teilnehmer, damit sie ein Konto erstellen können</p>
                </div>
                <code className="bg-gray-100 px-4 py-2 rounded text-sm text-gray-600 select-all">
                    {inviteLink}
                </code>
            </div>

            <div className="flex items-center justify-between mb-8">
                <p className="text-gray-500">Teilnehmerliste verwalten ({filtered.length})</p>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Suchen..."
                        className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-vastu-accent/50 w-64"
                    />
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Teilnehmer</th>
                            <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">E-Mail</th>
                            <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Registriert am</th>
                            <th className="text-right py-4 px-6 text-sm font-medium text-gray-500">Aktionen</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filtered.length > 0 ? (
                            filtered.map((student) => (
                                <tr key={student.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-vastu-light flex items-center justify-center text-vastu-dark">
                                                <User size={20} />
                                            </div>
                                            <span className="font-medium text-vastu-dark">{student.full_name || 'Kein Name'}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <Mail size={14} className="text-gray-400" />
                                            {student.email}
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-gray-500 text-sm">
                                        {new Date(student.created_at).toLocaleDateString('de-DE')}
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <button className="text-sm text-vastu-dark hover:text-vastu-dark/70 font-medium">
                                            Profil
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="py-12 text-center text-gray-500">
                                    {searchQuery ? 'Keine Teilnehmer gefunden' : 'Noch keine Teilnehmer registriert'}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
