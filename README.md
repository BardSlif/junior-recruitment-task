# Frontend Junior Developer Task

This project is simple To-Do list app using MVC approach with HTML, CSS (SCSS) and Javascript. It's also a part of recruitment process in [Qunabu](https://qunabu.com/). 

## Main goals

Main goal was to create app that uses backend API/Database to `CRUD` (create, read, update and delete) to-do's and display them without reloading the page (AJAX). This project provides also drag and drop functionality to move to-do's in the list. 

## Backend

This project uses backend public API to collect data provided by Qunabu from [here](https://todo-simple-api.herokuapp.com/todos). 

## How to run project in development mode? 

To use this project in development mode: 
* Download or clone the project 
* Install all project dependencies with `yarn install`
* Run `gulp watch` - it compiles all scss files into one main.css and also starts dev server thanks to `browser-sync` on default port `3000`
* Project should start automatically in your default browser
* You can also run `gulp styles` and after that open `frontend/index.html` file
 
## Dependencies 

This project uses: 

* [Gulp](https://gulpjs.com/)
* [Lato Google Font](https://www.google.com/fonts#UsePlace:use/Collection:Lato)
* [Qunabu API](https://todo-simple-api.herokuapp.com/todos)
* [Qunabu App Layout](https://raw.githubusercontent.com/qunabu/junior-recruitment-task/master/assets/to-do-list.png) 
based on [To Do List (PSD)](https://www.behance.net/gallery/10852567/To-Do-List-(PSD)) by Marijan Petrovski

### Copyrights

This task (and all assets) is shared under [MIT](https://opensource.org/licenses/MIT) license.
