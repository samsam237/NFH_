# SERVER BACKEND 

C'est le serveur auxquels sont connectés le l'application mobile et la carte arduino.

* Application Mobile : On consulte l'état de la maison


* Application Arduino : On envoie les informations de la maison 


### FCM (Firebase Cloud Messaging)

Outil pour envoyer des notifications

## structure de la base de données

La base de données permet de stocker : 

### Les informations des utilisateurs

* Identifiant (nom, email ou numéro)
* Password
* ...

### Les informations sur la maison

* Identifiant ~ code identification
* Position geographique (long, lat)
* Etat : 1/0 ou Mauvais/Bon

### Les informations sur les pièces de la maison

* Identifiant ~ code d'identification
* Etat : Bon (0), Danger (1), Urgent (2)
