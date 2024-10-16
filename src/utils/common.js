export const envPreset = agentPath => {
  switch (agentPath) {
    case 'cortez':
      return 'studio';
    case 'akira':
      return 'sunset';
    case 'bale':
      return 'sunset';
    default:
      return 'apartment';
  }
};
