### Host
+ [Justin Schwartzenberger](https://twitter.com/schwarty)

### Guest
+ [Marjan Georgiev](https://twitter.com/Marjan)
+ [Austin McDaniel](https://twitter.com/amcdnl)

### Panelists
+ [Mike Brocchi](https://twitter.com/Brocco)
+ [Olivier Combe](https://twitter.com/OCombe)
+ [Alyssa Nicoll](https://twitter.com/AlyssaNicoll)

### Episode Notes
+ What is ng2d3?
  + ng2d3 is an angular 2 component library for building data visualization
  + What Makes it special?
    + using angular 2 template engine and bindings for rendering the charts
    + allows us to leverage AoT, universal and server side rendering
    + helps us create reusable components, that allows us to compose more complex data visualizations using the angular component framework
  + D3
    + powerful
    + hard to create reusable charts in plain d3
    + jquery for dataviz
    + we still use d3 for the utilities it provides (scales, shapes, tweens), a lot of stuff, except touching the domain
  + Why build this?
    + Lots of tools out there, both commercial and open-source but ….
    + None of them use angular under the hood
    + all of them are frameworks on their own
    + you want to leverage the good frameworks for what they do, and not try to do everything
    + higher learning curve
    + violates DOM manipulation principles
    + we wanted a higher level of customization
    + we visualize very complex data, and specific functionality was needed for that, so we were struggling to make the other libraries do what we wanted them to do
  + History
    + Started 3 years ago, and have been using our own custom charting framework all this time
    + the version we have now is a result of 3 years of learning and testing
    + there was no angular 2 back then, but we needed some sort of framework for reusable charts
    + D3.chart
      + it was good enough - helped us organize the charts
      + angular 1 is great for a lot of things, but not a great fit for one-way binding component libraries
    + React
      + react started growing in popularity. Angular 2 was in development without a release date. React did what we wanted, so we started rewriting it in react
      + it worked nice. We had interop between angular and react, but we still had two libraries touching the DOM.
      + It did the job, but was a lot of maintenance of 2 frameworks
    + Angular2
      + When angular 2 was in RC, we started looking at what it would take to migrate
      + We decided to migrate
      + Both frameworks have component-driven architecture
      + it was not a huge effort, because it was the pattern and components mapped one to one. It was just a different implementation
      + we got rid of react, so we are running angular 1 and angular 2 using ngUpgrade. We are also using the charts inside angular 1
      + Cool things that angular2 gave us over react
        + angular gives us output emitters, in react we had to add that in
+ Demos
  + expressiveness
  + show demo page
  + show a bar chart as an end user
  + explain how bar charts are made
  + all the components, series, axis, down to the bar
+ Roadmap
  + Tests
  + Docs
  + More chart types
  + Angular2 Animate when it supports variables
  + Universal support
+ Upcoming shows
  + Education Tech with Wesley Cho, Victor Mejia and Minko Gechev 
  + Techniques for Testing with Duncan Hunter and Adam Stephensen


### Picks
+ Mike Brocchi
  + RxJS going v5.0.0 final next week (planned)   
    <https://github.com/ReactiveX/rxjs-core-notes/blob/master/2016-12/december-5.md>
  + James Kyle’s post about the OSS community (JavaScript in particular)   
    <https://medium.com/@thejameskyle/dear-javascript-7e14ffcae36c>
+ Austin McDaniel
  + Component Lab - React Story-book like component dev/test lib for Angular2    
    <https://github.com/synapse-wireless-labs/component-lab>
  + Angular 2.3 almost out - Inheritance of Components, Better mechanisms for dynamically inserting components
  + Who’s going to ngconf?! I am … hope i can meet u all!!!!
+ Justin Schwartzenberger
  + Google Home
    <https://madeby.google.com/home/>
+ Olivier Combe
  + Narwhal - Victor Savkin and Jeff Cross  
    <https://nrwl.io/>
+ Alyssa Nicoll
  + ng-cruise talk: Animations in an Angular World  
    <https://ngcruise.com/#/talks#AlyssaNicoll>
  + [egghead.io](https://egghead.io/)
+ Marjan
  + [D3](https://d3js.org/)