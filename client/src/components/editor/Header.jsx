
import React, { useState } from 'react';

const Header = ({ treeName, onNameChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(treeName);

  const handleBlur = () => {
    setIsEditing(false);
    onNameChange(name);
  };

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-border-light dark:border-border-dark px-6 py-3 bg-surface-light dark:bg-surface-dark z-20">
      <div className="flex items-center gap-4">
        {isEditing ? (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={handleBlur}
            autoFocus
            className="text-lg font-bold bg-transparent border-b"
          />
        ) : (
          <h2
            className="text-text-light dark:text-text-dark text-lg font-bold cursor-pointer"
            onClick={() => setIsEditing(true)}
          >
            {name}
          </h2>
        )}
      </div>
      <div className="flex flex-1 justify-end gap-2">
        <button className="flex items-center justify-center gap-2 overflow-hidden rounded-md h-10 px-4 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-text-light dark:text-text-dark text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800">
          <span className="truncate hidden sm:inline">Preview</span>
        </button>
        <button
          className="flex items-center justify-center gap-2 overflow-hidden rounded-md h-10 px-4 bg-primary text-white text-sm font-bold"
        >
          <span className="truncate">Publish</span>
        </button>
        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 ml-4" data-alt="User avatar" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBDNiRcay5QbPsK50IvWaHQhVocYfB4194vYEcC2P6MtaJbbDP6ESBLLVStK1x28_TWbWo4xQmvwp1J4kWLmuv4hXa-gAq7adqATDl6lYUSrSDhtLzLdJz_CkY7ltmaPshcDkXyN8j__WCmpGjtQafsHeGH1aqZIcG23boXxZ1msSRZCMHlR30skLHesw3FNtlj13xF1UuybFTU2wqBT7XGYoJjArUlKloURpbyOVLt0RxXf6k3LGgf2kC_EnMiDIdE9uoa1TANHXo")'}}></div>
      </div>
    </header>
  );
};

export default Header;
