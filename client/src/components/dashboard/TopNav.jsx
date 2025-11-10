import React from 'react';

const TopNav = () => {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-border-light dark:border-border-dark px-10 py-4 bg-surface-light dark:bg-surface-dark">
      <div className="flex items-center gap-4 text-text-light dark:text-text-dark">
        <h2 className="text-lg font-bold leading-tight">Tableau de bord</h2>
      </div>
      <div className="flex flex-1 justify-end items-center gap-4">
        <label className="flex flex-col w-full !h-10 max-w-sm">
          <div className="flex w-full flex-1 items-stretch rounded-lg h-full bg-black/5 dark:bg-white/5">
            <div className="text-text-muted-light dark:text-text-muted-dark flex items-center justify-center pl-3">
              <span className="material-symbols-outlined">search</span>
            </div>
            <input
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-0 border-none bg-transparent h-full placeholder:text-text-muted-light dark:placeholder:text-text-muted-dark pl-2 text-base font-normal leading-normal"
              placeholder="Rechercher un arbre..."
              value=""
            />
          </div>
        </label>
        <button className="flex cursor-pointer items-center justify-center rounded-lg h-10 w-10 bg-black/5 dark:bg-white/5 text-text-muted-light dark:text-text-muted-dark hover:bg-black/10 dark:hover:bg-white/10">
          <span className="material-symbols-outlined text-xl">notifications</span>
        </button>
        <div
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
          data-alt="User avatar with a colorful gradient"
          style={{
            backgroundImage:
              'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA_bxWUgIdzwgjcjBj--oyzX2PDPMTi0C8fgx7fUSc-RXO7d_755vZLoh7mMN8bSHZH66zPHR6u8C8dbp-z0L8jdT6CLyfPs9xHleBVSDu3wI0MpQJNhPEqx8egoreN7jPd8P6OYBsZQ5E_yWlWMNdG7NjvmIk5gOjs7SVsbyvDZiNHBR1ya7Q8EmBGdjX78ugo-tdN5DaMbStelvJV9tieW6Ptb6wQoDjLItoaU3KEPlmvKvMXWz_qUOI1a7pT9-tj2HTfFMZ7UBM")',
          }}
        ></div>
      </div>
    </header>
  );
};

export default TopNav;
