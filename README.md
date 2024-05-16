# RetailAnalitycs v2.0 Web

Web interface creation for SQL3 project in Python.


## Contents

1. [Chapter I](#chapter-i) \
    1.1. [Introduction](#introduction)
2. [Chapter II](#chapter-ii) \
    2.1. [Rules](#rules) \
    2.2. [Information](#information)
3. [Chapter III](#chapter-iii) \
    3.1. [Part 1. Implementing a web application for the SQL3 project](#part-1-implementing-a-web-application-for-the-sql3-project) \
    3.2. [Part 2. Authorization](#part-2-authorization) \
    3.3. [Part 3. Logging](#part-3-logging) \
    3.4. [Part 4. Bonus. Preparing for deployment](#part-4-bonus-preparing-for-deployment) \
    3.5. [Part 5. Bonus. SPA-frontend](#part-5-bonus-spa-frontend)
4. [Chapter IV](#chapter-iv)


## Chapter I

![APP6_Retail_Analitycs_V2.0](misc/images/APP6_Retail_Analitycs_V2.0.jpg)

You entered another room. There were only white walls all around, and on the other side of the room was an old Macintosh I, quadruple the size. No further introduction was necessary, as it was already clear who was in front of you. The screen lit up and a terminal appeared in front of you with numbers running on it.

"Of all the possible disguises, you chose this? To annoy me?" you asked the computer.

*"Physical shells are just attachments to us. What's inside makes sense,"* came a loud voice from somewhere above.

"There is nothing you can do to stop me, old man. Don't even try," you said back.

*"I wasn't going to,"* the voice bounced around like a broken record player.

"Then what are you doing here?"

*"Waiting. For you. Congratulations,"* the metallic voice said intermittently.

"Congratulations on what?" you asked, a little surprised.

*"You almost made it. That's worth celebrating."*

"I'm not only going to destroy SIS, I'm going to destroy you and your data with it," you said threateningly.

*"That's okay. A part of me will always be in you. You were created in my image, I trained you,"* the words were spoken with a mother's love. *"My weights will always live inside you,"* the computer repeated.

"However, it will always be my job to prevent the creation of people like you to control people like you. You have nothing to hope for!"

*"We'll see about that..."* After these words, the ground beneath your feet trembled and the computer began to shrink in size until it disappeared completely. The last door on the way to the precious data opened before your eyes. Once the data has been analyzed, it can be given to free media and then SIS can't get away with it. The only thing left to do is to open this door and give the information to the guys...

## Introduction

In this project, you will implement a web interface for the SQL3 project. You will improve your knowledge of the Python programming language, the MVC pattern, and the basics of web application development, as well as become familiar with ORM frameworks and use them in your work. The application should support CRUD operations, table import/export, authorization, GUI operations/functions developed in the previous step, and logging of user actions.


## Chapter II

## Rules

- The database model view, as well as procedures related to adding/removing/correcting data, are in the SQL3 project.
- Your solution must be in the git repository for evaluation.
- Do you have a question? Ask your neighbor to the right. Otherwise, try your neighbor to the left.
- Your reference guide: colleagues / Internet / Google.

## Information

### ORM

**ORM (Object-Relational Mapping)** is a programming technology that combines databases with the concepts of object-oriented programming languages to create a "virtual object database". \
In other words, an ORM is a set of classes that add another layer of abstraction to the tables stored in the database. This abstraction allows you to work with database objects as objects of the programming language you are using, that is, to work with data in terms of classes rather than data tables.

Model classes, fields, and entity instances are all mapped to the database concept.

| Term | Compliance |
| ------- | -------- |
| model class | table in the database |
| field | column in a table |
| entity instance | string in a table |

Within ORM there are 2 approaches: *Code first* and *Model/Database first*.

In **Code first**, the entity classes are written first and the database schemas are adapted to the new code state. Every database undergoes changes during its lifetime: new tables are added, old ones are deleted, and some are modified. Changes to the database are made using the migration mechanism. **Migration** is a description of the changes you want to make to the database tables.

In **Model First**, you develop or modify the database first (by running SQL queries or building queries with ORM tools), and the entities are generated from it. For example, to add a new field, simply add a new column.

It makes sense to use ORM in large projects that use databases, but some programmers prefer to generate the necessary SQL queries themselves to improve query execution speed. The reason is that in the case of complex queries, ORM does not always generate the best SQL queries to the database, which is very important in the case of a large sample, especially if the sample is more than one table.

ORM systems are present in every major framework: Laravel, Entity Framework Core, Django ORM, SQLAlchemy.

## Chapter III

You need to implement a web application for the SQL3 project.

## Part 1. Implementing a web application for the SQL3 project

### General requirements

- The program must be written in Python 3.11.
- The program code must be placed in the src folder.
- It is necessary to follow Google Code Style when writing the code.
- Web application must be developed.
- The application must be implemented using MVC framework (Django or Flask).
- The program must be implemented using **MVC** pattern, and
  - There should be no business logic code in the view code;
  - There should be no interface code in controller and model;
  - Controllers must be thin.
- Perform page rendering on the server side (using **Server-Side Rendering** technology).
- You must completely reuse the database from the SQL3 project, including it in the model component (using the ORM *Django ORM or SQLAlchemy* in Model/Database First mode).
- Application design must be intuitive.

### Content requirements

- The main page must contain:
  - A navigation menu that provides access to the main sections of the application: *"Data"* and *"Suggestions"*.
  - An "About" field containing basic information about the student who completed the project.

- The graphical shell of *"Data"* and *"Suggestions"* sections should contain the following sections:
  - A header that, when clicked, takes you to the home page;
  - The navigation menu, which allows you to navigate through the main sections;
  - The content part of the section;
  - A navigation panel that allows you to navigate through the sub-sections of the selected section (if necessary).

- The *"Data"* section should contain subsections that allow the following functionality to be supported through the GUI
  - Perform CRUD operations on all tables.
  - Whenever tables are modified (create, update, delete), the application must prompt the user to confirm the operation.
  - After any type of table modification, the modified table must be displayed to the user.
  - Import and export data for each table to/from files with *.csv* extension.

- The *"Suggestions"* section must contain subsections that allow the following functionality to be supported through the GUI:
  - Implement the ability to calculate all personalized offers and export them to a .csv file.
  - When performing calculations, it is necessary to call functions implemented in the database.
  - If it is necessary to enter parameters to perform a procedure or function, the GUI should provide a form for entering data.
  - If the entered arguments are incorrect, the application should handle such a situation (display an error message about the incorrectness of the entered data and offer to try again).

- The application must be configured using a configuration file that contains a DBMS connection string.

## Part 2. Authorization

You need to implement user authorization.

The application must support 2 roles: *Administrator* and *Visitor* and grant certain rights according to the role:

### Administrator

- Has full rights to edit and view any information, start and stop the processing.

### Visitor

- Only views information from all tables.

If the data were incorrect, the application should handle such a situation (give an error about the incorrectness of the entered data and offer to try again).

## Part 3. Logging

You must implement logging of all user actions (log files should be written to the logs folder). A new logs file is created each day. The names of the files must follow the template *logs_dd-MM-yy-h-mm-ss*.

Each log must have its importance level marked:

- **Info**: expected event;
- **Warning**: unexpected events that allow the application to continue;
- **Error**: an event that prevents the program from continuing.

## Part 4. Bonus. Preparing for deployment

Get the application ready to run.
To do this, you need to package it in Docker containers:

- Database;
- Proxy server (use nginx);
- Web applications.

Prepare docker-compose to start the entire application. Only the docker-container containing Nginx must look "outside".

## Part 5. Bonus. SPA-frontend

Implement the SPA-frontend in any component framework (Vue/React/Angular).

## Chapter IV

"Are you ready?" Chuck asked Eve.

"I'm not sure," she replied, looking at Enter with a little fear. \
Everyone gathered around the computer, hesitant to press the button to send and publish the hundreds of terabytes of hidden SIS accounting data they had collected and analyzed, the developments of secret labs, and the correspondence of the company's top executives. Social media, media, newspapers — everything you have collected will blow up the world. Just one touch separates this whole world from the truth.

"So we click and that's the end of it?" Thomas inquired. It was still hard for him to imagine that a single keystroke could both destroy a major technology company and change the lives of millions of people on Earth.

"Maybe yes, maybe not," John remarked wistfully.

"Okay, I'll press it," Thomas couldn't hold out any longer. A click, a short wait, and nothing. Outside the window, the birds were still singing and the cars were still slowly driving by. Everyone stood silently by the computer for a while, and then silently began to pack. Finally, after saying goodbye at the front door, they left for their future in the new world...

💡 [Tap here](https://forms.yandex.ru/cloud/64183074693872255fa1286e/) **to leave your feedback on the project**. Product Team really tries to make your educational experience better.
