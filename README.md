# EDT EPS — PWA GitHub Pages

Application EPS installable, basée sur l’EDT annuel et le logo N’EPS / EDT.

## Dépôt sur GitHub

1. Créer un nouveau dépôt GitHub, par exemple `edt-eps`.
2. Déposer tous les fichiers de ce dossier à la racine du dépôt.
3. Aller dans **Settings > Pages**.
4. Dans **Build and deployment**, choisir :
   - Source : **Deploy from a branch** ;
   - Branch : **main** ;
   - Folder : **/root**.
5. Valider. L’application sera disponible à l’adresse GitHub Pages indiquée.

## Installation comme application

Une fois publiée en HTTPS avec GitHub Pages :

- sur ordinateur : ouvrir l’adresse, puis cliquer sur **📲 Installer** ou utiliser l’icône d’installation du navigateur ;
- sur Android : ouvrir dans Chrome, menu `⋮`, puis **Ajouter à l’écran d’accueil** ;
- sur iPhone/iPad : ouvrir dans Safari, bouton de partage, puis **Sur l’écran d’accueil**.

## Fichiers importants

- `index.html` : application complète.
- `manifest.webmanifest` : informations PWA, nom, icônes, mode d’affichage.
- `service-worker.js` : cache hors connexion.
- `assets/icons/` : icônes générées à partir du logo.
- `.nojekyll` : évite que GitHub Pages transforme les fichiers.

## Sauvegarde des données

Les données de l’application restent stockées localement dans le navigateur. Utiliser les fonctions **Exporter / Importer** et **Administration > Sauvegarde** pour transférer ou sécuriser les données.


## Version mise à jour

Cette version améliore la mise en page du bandeau : sélection APSA et légende des lieux dans le bandeau haut, palette APSA condensée, bouton Masquer/Afficher les APSA, suppression des APSA Danse, Basket et Spike-Ball, et retrait de la ligne de titre des vues annuelles.
