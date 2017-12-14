# kronoku

[kronoku.com](https://www.kronoku.com)

A web app for scheduling SMS reminders.

The repo contains the font-end code for the kronoku web app. The back-end code is not uploaded for security reasons, however some notes about the architecture can be read below.

## Development 

Below are some notes about the development of kronoku.

#### Front End: React
To make a single-page app with smooth transitions between states a component-based UI framework is a must. There are a few popular options including React, Angular, and Vue. Being as I was already familiar with React, it was the obvious choice. 

#### Back End: NodeJS + Express
Since I developed the front and back end of kronoku at the same time, using the same language for both really sped things up. Additionally, since I was only serving a single page, a full-blown LAMP stack seemed like overkill. 

#### Hosting: Heroku
Setting up a NodeJS app on Heroku is a breeze, and the cost of running a hobby-level server is affordable. Perhaps most importantly, Heroku provides automatic SSL certificates which saved me the hassle of setting one up myself. 

#### DB: ClearDB (MySql)
I had already written a large chunk of the server-side code before I had decided on a DB solution. In retrospect, I should have planned further ahead. Heroku natively supports PostgreSQL, which would have been my first choice had I not already designed my schema and written my queries using MySQL and node-mysql. In the end I simply used a ClearDB MySQL plugin for Heroku which suits my needs well enough. 



