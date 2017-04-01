### Host
* [Justin Schwartzenberger](https://twitter.com/schwarty)
### Guests
* [Justin James](https://twitter.com/digitaldrummerj)
### Panelists
* [Austin McDaniel](https://twitter.com/amcdnl)
* [Mike Brocchi](https://twitter.com/Brocco)

### Episode Notes
* Intros
   * **Justin’s Bio:** I live in sunny Chandler, Arizona where I actually had 
        to turn on my air conditioner this week.  Sorry for all of you that 
        are getting snow right now.  I have been designing and programming 
        designing web applications for over 20 years starting with classic 
        ASP, moving to .NET and now onto Angular and Node.

        I am very passionate about coding, teaching and sharing my knowledge to 
        help you grow in your career.  I frequently speaks at conferences,
        meetups and community events.  I try to post regularly about web and 
        mobile development at <http://digitaldrummerj.me>. 

        In my limited free time, I am one of the Arizona Give Camp Organizers 
        where we put on hackathons for developers to code it forward to 
        assist Non-Profits with their IT needs.  
* Sails
   * What is it?
       * Node framework to create JavaScript based services.  
           * It sits on top of Express so if you ever need to get more low-level you can access the raw Express objects.
           * Convention over configuration
           * Out of the box, get full RESTful API without writing any code 
               * Can easily override the built-in methods by creating the appropriately named function in the controller (e.g. find or findOne for GET, create for POST, destroy for DELETE and update for UPDATE)
               * Standard REST routes are defined automatically for you.  If you need custom routes you defined them in the routes.js file.  
       * Includes the Waterline ORM to abstract the data store queries
           * Models can be schema less or you can define the model and the attributes of the fields like data type,  is required or not, default value.
           * Out of the box, Sails is configured for a file based json data store which allows you to immediately start working on the API and then change the configuration to your real database when you are ready.
           * Can connect to over 30 data stores (MySQL, Postgres, Mongo, redis, MS SQL, Couchbase, etc)
           * Supports associations between models (one to many, many to many, etc).  Can even do associations across different databases
       
       * Declarative reusable security policies as middleware functions that run before your controllers and actions.  Interchangable with Express/Connect middleware so you can use popular npm modules like Passport or Satellizer.
       * Sails is Front-end agnostic.  It is technically an MVC framework but I am only using Sails for the MV part.  For the UI, I am using Angular as a separate project so that I can deploy the UI and API in their own instances.
    * How does it play with Angular?
        * It plays very nicely with Angular and AngularJS using the built in http modules
        * JSON is returned back from the Sails API.  
        * You can use either Observables or Promises to consume the data
    * What do you need to install to get started?
        * Node 4 or greater.  
        * Global npm packages for Sails
        * Text editor, I prefer Visual Studio Code  
          <http://code.visualstudio.com/> 
        * Postman for exercising the API without creating a UI  
          <https://www.getpostman.com/> 
        * There are 3 important commands for the Sails CLI
            * Sails new  - create a new project
            * Sails generate api - create a new end point with a model and controller
            * Sails lift -  runs the API locally on port 1337
* Demos
    * Code:  
      <https://github.com/digitaldrummerj/angular-air-104> 
* Wrap Up


### Picks
* Justin J.
   * Angular Attack 48 hour online Angular hackathon April 22-23  
     <https://www.angularattack.com/> 
   * If you are in Arizona on March 24th-26th come out to the 8th 
        Annual Arizona Give Camp Hackathon-of-Help to assist Non-Profits 
        with their software needs  
        <https://meetup.com/azgivecamp> 
   * Go through Docker tutorials all in the browser.  Repo:  
     <https://github.com/play-with-docker/play-with-docker.github.io> 
* Justin S.
   * Hyper  
     <https://hyper.is/>
* Mike
  * New Angular hotness
  * Angular - 4.0.0-rc.3
  * Angular CLI - 1.0.0-rc.2
* Austin
  * Animista  
    <http://animista.net/> 