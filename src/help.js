const help = () =>  {
  return Promise.resolve(
    {
      type: 'carousel',
      content: [
        {
          title: 'Additions',
          imageUrl: '',
          subtitle: 'Je sais faire des additions.'
        },
        {
          title: 'Générer des nombres',
          imageUrl: '',
          subtitle: 'Je sais générer des nombres aléatoires, pairs ou premiers.'
        },
        {
          title: 'Afficher des images.',
          imageUrl: '',
          subtitle: 'Aucun rapport avec les maths. Mais les chats sont populaires sur le net.'
        },
      ]
    }
  )
}

module.exports = help
