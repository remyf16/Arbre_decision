
import React, { useState } from 'react';

const CreateTreeModal = ({ isOpen, onClose, onCreate }) => {
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(name);
    setName('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Créer un nouvel arbre</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nom de l'arbre"
            className="w-full p-2 border rounded-md"
            required
          />
          <div className="mt-4 flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-md bg-gray-200">Annuler</button>
            <button type="submit" className="px-4 py-2 rounded-md bg-primary text-white">Créer</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTreeModal;
