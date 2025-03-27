export const muscles = [
  "abdominals", "abductors", "adductors", "biceps", "calves", "chest", "forearms", "glutes", "hamstrings", "lats", "lower_back", "middle_back", "neck", "quadriceps", "traps", "triceps"
]

export function fixName(muscle = '') {
  const withEscape = muscle.replace(/_/g, ' ')
  const fixedName = withEscape
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
  
  return fixedName
}

export function getImgUrl(muscle = '') {
  return '/muscle-icons/' + muscle + '.png'
}

