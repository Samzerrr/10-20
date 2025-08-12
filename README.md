# 🚔 SASP Quiz 10-20 - Entraînement Codes Radio

Un quiz d'entraînement spécialement conçu pour les officiers du SASP (San Andreas State Police) sur les codes radio 10-20 et les procédures de communication.

## ✨ Fonctionnalités

- **Interface moderne** : Design responsive avec animations fluides
- **174 questions SASP** : Base de données complète avec 10 zones géographiques réelles
- **15 questions aléatoires** : Sélection automatique pour chaque entraînement
- **6 noms de lieux par question** : Questions à choix multiples pour identifier les lieux
- **Timer intégré** : 15 secondes par question pour simuler la pression
- **Barre de progression** : Suivi visuel de l'avancement
- **Score en temps réel** : Affichage du score pendant l'entraînement
- **Rapport complet** : Toutes vos réponses avec les noms corrects à la fin
- **Zones géographiques réelles** : Vinewood, Sud LS, Centre Ville, Marina/Plage, Mirror Park, Del Perro/Vespucci, Université, Nord, etc.

## 🚀 Comment utiliser

1. **Ouvrir le fichier** : Double-cliquez sur `index.html` pour ouvrir l'entraînement dans votre navigateur
2. **Commencer** : Cliquez sur "Commencer l'Entraînement" sur l'écran d'accueil
3. **Répondre** : Regardez l'image et sélectionnez le bon nom de lieu parmi les 6 options
4. **Continuer** : Cliquez sur "Code suivant" après avoir répondu
5. **Voir le rapport** : Consultez votre score final et le rapport détaillé de vos réponses

## 📁 Structure des fichiers

```
questionnaiore/
├── index.html      # Page principale du quiz
├── style.css       # Styles CSS pour le design
├── script.js       # Logique JavaScript du quiz
├── questions.js    # Base de données de 175 questions
└── README.md       # Documentation (ce fichier)
```

## 🎨 Personnalisation

### Ajouter vos propres lieux

Pour ajouter vos propres questions, modifiez le tableau `allQuestions` dans `questions.js` :

```javascript
{
    question: "Quel est ce lieu ?",
    image: "URL_de_votre_image",
    answers: [
        "Nom du lieu correct",
        "Autre lieu 1", 
        "Autre lieu 2",
        "Autre lieu 3",
        "Autre lieu 4",
        "Autre lieu 5"
    ],
    correct: 0,  // Index de la bonne réponse (0-5)
    category: "Votre zone"
}
```

### Modifier le design

- **Couleurs** : Modifiez les variables CSS dans `style.css`
- **Police** : Changez la police Google Fonts dans `index.html`
- **Animations** : Ajustez les transitions dans `style.css`

### Changer le nombre de questions

1. Modifiez le tableau `allQuestions` dans `questions.js`
2. Pour changer le nombre de questions par entraînement, modifiez la fonction `getRandomQuestions(15)` dans `script.js`
3. Ajustez le nombre affiché dans `index.html` (ligne 18)

## 🌐 Compatibilité

- ✅ Chrome (recommandé)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile (responsive)

## 📱 Fonctionnalités mobiles

- Design responsive adapté aux écrans tactiles
- Boutons optimisés pour le touch
- Interface adaptée aux petits écrans

## 🔧 Technologies utilisées

- **HTML5** : Structure sémantique
- **CSS3** : Styles modernes avec Flexbox et Grid
- **JavaScript ES6+** : Logique interactive
- **Google Fonts** : Typographie Poppins
- **Unsplash** : Images de haute qualité

## 📊 Statistiques de l'entraînement

L'entraînement affiche plusieurs statistiques :
- Score final (X/15)
- Pourcentage de réussite
- Nombre de réponses correctes
- Nombre de réponses incorrectes
- Temps moyen de réponse
- **Rapport complet** : Toutes vos réponses avec les noms corrects

## 🎮 Contrôles

- **Clic** : Sélectionner un nom de lieu
- **Timer automatique** : 15 secondes par question pour simuler la pression
- **Navigation** : Boutons pour avancer et recommencer

## 📝 Notes

- Les images sont chargées depuis Imgur (connexion internet requise)
- L'entraînement sélectionne automatiquement 15 questions aléatoires parmi 174 disponibles
- Les questions sont organisées en 10 zones géographiques réelles : Vinewood, Sud Los Santos, Sud Ouest LS, Centre Ville, Quartier LS, Marina/Plage, Mirror Park, Del Perro/Vespucci, Université, Nord
- Les réponses sont verrouillées après sélection
- Le timer s'arrête automatiquement quand une réponse est sélectionnée
- Le rapport final montre toutes vos réponses avec les noms corrects
- Basé sur les vrais lieux et positions utilisés par le SASP dans GTA RP

## 🤝 Contribution

Pour améliorer cet entraînement :
1. Ajoutez vos propres lieux
2. Personnalisez le design
3. Ajoutez de nouvelles fonctionnalités
4. Partagez vos améliorations !

---

**Bon entraînement, officier ! 🚔** 