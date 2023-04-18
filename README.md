Glossary App

The Glossary App is a web application that allows users to manage a collection of terms and their corresponding definitions. Users can add new terms, edit existing terms, and delete terms. The app provides an easy-to-use interface for navigating and searching the glossary.

#Features

Add new terms and definitions

Edit existing terms and definitions

Delete terms from the glossary

Search for terms in the glossary

Responsive and user-friendly interface


#Technologies Used

HTML
CSS
JavaScript
Node.js
Express.js
SQLite3

#Installation and Setup

  Install Git:

  From 
        https://git-scm.com/download 
  
  download and install Git. 
  
  Create application folder:
  
  Open Powershell as Admin and create a folder for the application
      
         PS C:\> mkdir glossary3000

  Clone the repository:
      
  Change to new directory and clone the repository
            
         PS C:> cd glossary3000
  
  then clone the repository
           
         PS C:\glossary3000> git clone https://github.com/AjmalSarwary/Glossary.git

  Change to the project directory and install dependencies:
    
     PS C:\glossary3000> cd glossary
     PS C:\glossary3000\glossary> npm install
  
  Install database:
  
     PS C:\glossary3000\glossary> npm install sqlite3

  Start the server:

     PS C:\glossary3000\glossary> npm start

  Open application:

  Open your web browser and navigate to 
  
     http://localhost:3000 
     
  to view the app.


#Usage

Add a new term and definition: Click the "Add Term" button on the main page. Enter the term and its definition in the provided input fields, and click "Save."

Edit an existing term: Click on a term in the list to display its definition. Click the "Edit" button, update the term and/or definition, and click "Save."

Delete a term: Click on a term in the list to display its definition. Click the "Delete" button to remove the term and its definition from the glossary.

Search for a term: Use the search bar on the main page to search for terms. The list will update as you type, showing only terms that match your search query.


#Contributing

Fork the repository on GitHub.
Create a new branch for your feature or bug fix.
Commit your changes and push to your fork.
Submit a pull request to the main repository.


#License

This project is licensed under the MIT License. See the LICENSE file for more information.
