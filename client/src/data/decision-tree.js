export const decisionTree = {
  'start': {
    id: 'start',
    question: 'Étape 1 : Le problème est-il logiciel ?',
    description: "Décrivez ici le contexte de la question pour aider l'utilisateur à faire le bon choix.",
    answers: [
      { text: 'Oui', nextNode: 'software_issue' },
      { text: 'Non', nextNode: 'hardware_issue' },
      { text: 'Je ne sais pas', nextNode: 'unknown_issue' },
    ],
  },
  'software_issue': {
    id: 'software_issue',
    question: 'Étape 2 : Avez-vous essayé de redémarrer l\'application ?',
    isResult: false,
    answers: [
        { text: 'Oui', nextNode: 'reinstall' },
        { text: 'Non', nextNode: 'restart_app' },
    ],
  },
  'hardware_issue': {
    id: 'hardware_issue',
    question: 'Étape 2 : Le périphérique est-il correctement branché ?',
    isResult: false,
    answers: [
        { text: 'Oui', nextNode: 'check_cables' },
        { text: 'Non', nextNode: 'plug_in' },
    ],
  },
    'unknown_issue': {
        id: 'unknown_issue',
        isResult: true,
        title: 'Contacter le support',
        description: 'Nous ne pouvons pas diagnostiquer le problème avec les informations fournies. Veuillez contacter notre équipe de support.',
    },
    'restart_app': {
        id: 'restart_app',
        isResult: true,
        title: 'Veuillez redémarrer l\'application',
        description: 'La plupart des problèmes logiciels simples sont résolus par un simple redémarrage.',
    },
    'reinstall': {
        id: 'reinstall',
        isResult: true,
        title: 'Essayez de réinstaller l\'application',
        description: 'La désinstallation et la réinstallation de l\'application peuvent résoudre des problèmes de corruption de fichiers.',
    },
    'plug_in': {
        id: 'plug_in',
        isResult: true,
        title: 'Veuillez brancher le périphérique',
        description: 'Assurez-vous que tous les câbles sont correctement connectés avant de continuer.',
    },
    'check_cables': {
        id: 'check_cables',
        isResult: true,
        title: 'Vérifiez les câbles pour tout dommage',
        description: 'Des câbles endommagés peuvent causer des problèmes matériels. Si vous en trouvez, remplacez-les.',
    },
};
