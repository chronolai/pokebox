import pokemon from './pokemon';

export function pad(index) {
  return index.toString().padStart(3, 0);
};

export function findPokemon(idx) {
  const pm = pokemon.find(pm => pm[0] === pad(idx));
  const [id, tw, jp, en] = pm;
  return {
    id,
    name: {
      tw,
      jp,
      en,
    },
  };
}