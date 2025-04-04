export default function FAQ() {
  const faqs = [
    {
      question: "Comment fonctionne le service de transfert d'emails?",
      answer: "Notre service crée une adresse email intermédiaire qui transmet les messages à votre adresse réelle, sans jamais révéler celle-ci. Tous les emails sont chiffrés de bout en bout pour une confidentialité maximale."
    },
    {
      question: "Pourquoi n'acceptez-vous que le Monero comme paiement?",
      answer: "Le Monero offre un niveau de confidentialité inégalé dans le monde des cryptomonnaies. Contrairement à Bitcoin ou d'autres cryptomonnaies, les transactions Monero sont totalement privées, préservant ainsi votre anonymat financier."
    },
    {
      question: "Conservez-vous des données sur les utilisateurs?",
      answer: "Non. Nous ne conservons aucune donnée personnelle ou métadonnée qui pourrait compromettre votre anonymat. Les informations minimales nécessaires au fonctionnement du service sont chiffrées et supprimées dès qu'elles ne sont plus nécessaires."
    },
    {
      question: "Comment puis-je être sûr que mon anonymat est protégé?",
      answer: "Notre infrastructure est conçue avec la confidentialité comme priorité absolue. Nous n'exigeons aucune information personnelle, acceptons uniquement des paiements anonymes, et utilisons un chiffrement de bout en bout pour toutes les communications."
    },
    {
      question: "Puis-je utiliser ce service pour des activités illégales?",
      answer: "Non. Bien que nous valorisions la confidentialité et l'anonymat, nous interdisons strictement l'utilisation de notre service pour des activités illégales. Tout compte suspecté d'être utilisé pour de telles activités sera immédiatement désactivé."
    },
    {
      question: "Comment puis-je vous contacter en toute sécurité?",
      answer: "Vous pouvez nous contacter en utilisant notre clé PGP pour chiffrer vos messages ou via notre canal Telegram. Ces deux méthodes garantissent une communication sécurisée et privée."
    },
    {
      question: "Qu'est-ce qui distingue Alyosha des autres services d'email anonymes?",
      answer: "Alyosha se distingue par son engagement inébranlable envers l'anonymat, son utilisation exclusive du Monero comme méthode de paiement, ses protocoles de sécurité avancés et son approche sans compromis de la protection de la vie privée."
    }
  ];

  return (
    <section id="faq" className="section bg-muted/30">
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4 text-primary text-glow">
            Questions Fréquentes
          </h2>
          <p className="text-muted-foreground md:text-xl max-w-3xl mx-auto">
            Tout ce que vous devez savoir sur notre service
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 max-w-5xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="space-y-3">
              <h3 className="text-xl font-semibold">{faq.question}</h3>
              <p className="text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 