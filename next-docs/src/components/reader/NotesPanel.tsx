"use client";

import { useState, useEffect } from 'react';
import { X, Plus, Trash2, StickyNote, Search, Loader2 } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { createNote, getNotes, deleteNote } from '@/lib/actions/notes';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

export function NotesPanel({ slug }: { slug: string }) {
  const { notesPanel, setNotesPanel, notes, setNotes, addNote, removeNote } = useAppStore();
  const [moduleTitle, setModuleTitle] = useState('');

  // Read the current page H1 title when the panel opens or slug changes
  useEffect(() => {
    try {
      const el = document.querySelector('h1');
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setModuleTitle(el?.textContent?.trim() || '');
    } catch {
      setModuleTitle('');
    }
  }, [slug, notesPanel]);
  const [newNote, setNewNote] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [saving, setSaving] = useState(false);

  const currentNotes = notes[slug] || [];

  async function loadNotes() {
    const result = await getNotes(slug);
    if (result.data) {
      setNotes(slug, result.data);
    }
  }

  useEffect(() => {
    if (notesPanel) {
      loadNotes();
    }
  }, [notesPanel, slug]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAddNote = async () => {
    if (!newNote.trim()) return;
    setSaving(true);

    const result = await createNote({
      slug,
      content: newNote.trim(),
      note_type: 'sticky',
    });

    if (result.data) {
      addNote(slug, result.data);
      setNewNote('');
      toast.success('Note saved!');
    } else if (result.error) {
      toast.error('Failed to save note');
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    removeNote(slug, id); // Optimistic
    const result = await deleteNote(id);
    if (result.error) {
      loadNotes(); // Rollback
      toast.error('Failed to delete note');
    } else {
      toast.success('Note deleted');
    }
  };

  const filteredNotes = searchQuery
    ? currentNotes.filter(n => n.content.toLowerCase().includes(searchQuery.toLowerCase()))
    : currentNotes;

  return (
    <AnimatePresence>
      {notesPanel && (
        <>
          {/* Mobile overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setNotesPanel(false)}
            className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white dark:bg-[#0e0e11] border-l border-black/10 dark:border-white/10 z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-black/5 dark:border-white/5">
                <div className="flex items-center gap-2">
                <StickyNote className="w-4 h-4 text-amber-500" />
                <div>
                  <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200">Notes</h2>
                  <div className="text-[11px] text-gray-500">{moduleTitle || 'Current Module'}</div>
                </div>
                <span className="ml-auto text-[10px] bg-black/5 dark:bg-white/5 px-1.5 py-0.5 rounded-full text-gray-500 font-mono">
                  {currentNotes.length}
                </span>
              </div>
              <button
                onClick={() => setNotesPanel(false)}
                className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-gray-400 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search */}
            {currentNotes.length > 3 && (
              <div className="px-4 pt-3">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search notes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-lg text-xs text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
                  />
                </div>
              </div>
            )}

            {/* Notes List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
              {filteredNotes.length === 0 ? (
                <div className="text-center py-12">
                  <StickyNote className="w-8 h-8 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                  <p className="text-xs text-gray-400">
                    {searchQuery ? 'No matching notes' : 'No notes yet for this page'}
                  </p>
                </div>
              ) : (
                filteredNotes.map((note) => (
                  <div
                    key={note.id}
                    className="group bg-amber-500/5 dark:bg-amber-500/5 border border-amber-500/10 dark:border-amber-500/10 rounded-xl p-3 relative"
                  >
                    <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                      {note.content}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[10px] text-gray-400 font-mono">
                        {new Date(note.created_at).toLocaleDateString('en-US', {
                          month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                        })}
                      </span>
                      <button
                        onClick={() => handleDelete(note.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 rounded-md hover:bg-red-500/10 text-red-400 transition-all cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Add Note */}
            <div className="p-4 border-t border-black/5 dark:border-white/5 bg-black/[0.01] dark:bg-black/20">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Write a note..."
                rows={3}
                className="w-full p-3 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-xl text-xs text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-amber-500/50 resize-none transition-all"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                    handleAddNote();
                  }
                }}
              />
              <button
                onClick={handleAddNote}
                disabled={!newNote.trim() || saving}
                className="mt-2 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-semibold hover:from-amber-400 hover:to-orange-400 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98] transition-all cursor-pointer"
              >
                {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
                Add Note
              </button>
              <p className="text-[10px] text-gray-400 text-center mt-1.5">Ctrl+Enter to save</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
