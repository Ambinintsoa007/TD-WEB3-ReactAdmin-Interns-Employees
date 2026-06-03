# REPONSES.md — React-Admin Partie 2

## Question 6.1

`ReferenceField` utilise le champ `managerId` du stagiaire pour récupérer l’employé correspondant dans la ressource `employees`.

Dans une liste, React-Admin peut regrouper les managers à charger et envoyer une requête de type :

```txt
GET http://localhost:3002/employees?id=1&id=2&id=4
```

S’il n’y a qu’un seul manager à résoudre, la requête peut ressembler à :

```txt
GET http://localhost:3002/employees?id=1
```

Cela permet d’afficher le nom complet du manager dans la liste des stagiaires.

## Question 6.2

Si `managerId` ne correspond à aucun employé existant, React-Admin ne peut pas résoudre la référence.

Visuellement, la colonne Manager peut rester vide ou ne rien afficher pour ce stagiaire. Cela signifie que la relation entre le stagiaire et son manager est invalide.

---

## Question 7.1

Lors de la soumission de `InternCreate`, React-Admin envoie une requête HTTP de type `POST`.

L’endpoint appelé est :

```txt
POST http://localhost:3002/interns
```

Cette requête permet d’ajouter un nouveau stagiaire dans la ressource `interns`.

## Question 7.2

J’utilise le hook `useWatch` de `react-hook-form`.

Il permet de lire en temps réel la valeur courante du champ `isRemunerate`.

Grâce à ce hook, on peut afficher et rendre obligatoire le champ `remuneration` uniquement lorsque `isRemunerate` est coché.

---

## Question 8.1

`ReferenceField` est un composant React-Admin prêt à l’emploi. Il sert surtout à afficher une donnée liée dans une page `List` ou `Show`, par exemple afficher le manager d’un stagiaire à partir de `managerId`.

`useGetOne` est un hook plus bas niveau. Il permet de charger manuellement un enregistrement précis dans un composant custom.

On préfère `ReferenceField` pour un affichage simple de relation.

On préfère `useGetOne` quand on veut créer une interface personnalisée, gérer manuellement les états `isPending`, `error`, `data`, ou afficher les données dans un composant custom comme `ManagerCard`.

## Question 8.2

Si `useGetOne` reçoit `id: undefined`, React-Admin risque d’essayer de faire une requête invalide, par exemple vers un employé qui n’existe pas.

Cela peut provoquer une erreur ou un appel API inutile.

L’option :

```ts
{ enabled: !!managerId }
```

permet d’empêcher l’appel tant que `managerId` n’est pas disponible. La requête ne se lance donc que lorsque l’identifiant du manager existe réellement.

---

## Question 9.1

`ReferenceManyField` est un composant déclaratif utilisé pour afficher automatiquement une liste d’enregistrements liés à un enregistrement courant.

`useGetList` est un hook plus flexible. Il permet de charger une liste avec des filtres, de récupérer le total, de gérer les états de chargement et d’erreur, et de construire un affichage personnalisé.

`useGetList` est indispensable quand on veut créer un composant custom, appliquer une logique spécifique, afficher le total, ou optimiser la requête selon le contexte.

## Question 9.2

Pour optimiser `DepartmentStats`, il faut éviter de charger tous les employés du département.

On utilise donc :

```ts
pagination: { page: 1, perPage: 1 }
```

Ainsi, React-Admin récupère seulement un enregistrement, mais il reçoit quand même le `total`.

Comme on veut uniquement connaître le nombre de collègues actifs, le `total` suffit.

---

## Question 10.1

`useUpdate` utilise la méthode de mise à jour définie par le `dataProvider`.

Avec `ra-data-json-server`, la mise à jour utilise généralement une requête HTTP `PUT`.

Pour forcer `PATCH` au lieu de `PUT`, il faudrait personnaliser le `dataProvider`, notamment sa méthode `update`, afin qu’elle envoie une requête `PATCH`.

## Question 10.2

`previousData` représente les anciennes données de l’enregistrement avant modification.

Il est important parce que React-Admin l’utilise pour gérer correctement les mises à jour optimistes, l’annulation éventuelle, le cache et la comparaison entre l’ancien état et le nouvel état.

Si on l’omet, la mise à jour peut mal fonctionner selon le `dataProvider`, ou React-Admin peut ne pas pouvoir gérer correctement le rollback et le cache.

---

## Question 11.1

Le composant `<Create>` de React-Admin sert à créer une page complète de création avec formulaire, route, titre, redirection et gestion standard.

`useCreate` est un hook plus bas niveau. Il permet de créer une donnée depuis un composant personnalisé, sans forcément changer de page.

Dans notre cas, `useCreate` est utilisé dans une modale pour ajouter rapidement un stagiaire sans quitter la liste.

## Question 11.2

Après une création réussie avec `useCreate`, on peut recharger la liste avec le hook `useRefresh`.

Dans le callback `onSuccess`, on appelle :

```ts
refresh();
```

Puis on ferme la modale et on réinitialise les champs du formulaire.

Cela permet d’afficher directement le nouveau stagiaire dans la liste.

---

## Question 12.1

Les 4 appels `useGetList` du Dashboard se font en parallèle.

Ils sont lancés indépendamment pendant le rendu du composant, car aucun appel ne dépend du résultat d’un autre.

Chaque carte du Dashboard récupère son propre total : total employés, employés actifs, total stagiaires et stagiaires rémunérés.

## Question 12.2

`perPage: 1` est préférable à `perPage: 100` parce qu’on n’a pas besoin de charger toutes les données.

Dans le Dashboard, on veut seulement afficher des compteurs.

Avec `perPage: 1`, l’API renvoie très peu de données, mais React-Admin peut quand même utiliser le `total`.

Cela rend la requête plus légère et plus optimisée.
