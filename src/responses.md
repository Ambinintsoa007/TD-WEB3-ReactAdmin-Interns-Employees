# REPONSES.md

## Question 1.1
Le dataProvider représente le lien entre React-Admin et l’API REST.

Son rôle est de traduire les actions de React-Admin en requêtes HTTP vers l’API. Par exemple, quand React-Admin veut afficher la liste des employés, le dataProvider envoie une requête GET vers l’API.

## Question 1.2
Au chargement de la liste, React-Admin envoie une requête HTTP de type GET vers :

GET http://localhost:3002/employees

Cette requête permet de récupérer la liste des employés depuis json-server.

---

## Question 2.1
La prop rowClick="edit" sur le Datagrid permet de rediriger automatiquement vers la page de modification lorsqu’on clique sur une ligne du tableau.

Par exemple, si on clique sur Alice Martin, on arrive sur la page d’édition de cet employé.

## Question 2.2
Quand on passe perPage à 2, la liste affiche seulement 2 employés par page.

Comme il y a 3 employés dans les données de départ, React-Admin crée une pagination avec une deuxième page pour afficher le troisième employé.

---

## Question 3.1
Si on soumet le formulaire sans remplir le prénom, React-Admin bloque l’envoi du formulaire.

Un message d’erreur apparaît parce que le champ firstname est obligatoire avec validate={required()}.

## Question 3.2
Si on saisit un salaire de 500 euros, React-Admin bloque aussi l’envoi du formulaire.

Le salaire minimum demandé est 1500, donc la validation minValue(1500) empêche d’enregistrer un salaire inférieur à 1500.

---

## Question 4.1
Lors de la sauvegarde d’une modification, la méthode HTTP utilisée est généralement PUT.

React-Admin envoie une requête vers l’API pour remplacer les données de l’employé modifié.

Exemple :

PUT http://localhost:3002/employees/1

## Question 4.2
useRecordContext() est disponible quand React-Admin a chargé l’enregistrement courant.

Dans la page de modification, il permet de récupérer les données de l’employé affiché.

Si l’enregistrement n’est pas encore chargé, useRecordContext() peut retourner undefined. C’est pour cela qu’on vérifie souvent :

if (!record) {
  return <span>Modifier employé</span>;
}

---

## Question 5.1
SimpleShowLayout affiche les informations d’un enregistrement dans une page simple, les unes sous les autres.

TabbedShowLayout permet d’organiser les informations dans plusieurs onglets.

Donc SimpleShowLayout est adapté pour une fiche détail simple, tandis que TabbedShowLayout est utile quand il y a beaucoup d’informations à séparer par catégories.