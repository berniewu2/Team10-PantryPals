# ADR 1: Adoption of React for Frontend Refactoring

## Created By: Ethan
## Date: May 9
## Decision Maker: Jett, Bernie
## Stakeholders: Team 10
## Status: Accepted

## Context
Our current Java application utilizes JavaFX for the frontend, providing a desktop-based user interface. However, in order to increase accessibility, there is a need to refactor our desktop app into a web app. This transition necessitates the selection of an appropriate frontend framework.

## Decision
After evaluating various options, including Angular, Vue.js, and React, the decision is to adopt React as the frontend framework for refactoring our Java application into a web app. React's popularity, extensive community support, robust ecosystem, and compatibility with our existing Java backend make it the preferred choice.

## Consequences
- **Improved User** Experience: React's component-based architecture allows for the creation of dynamic and interactive user interfaces, enhancing the overall user experience.
- **Learning Curve:** While React offers benefits, there may be a learning curve for team members unfamiliar with the framework since there is only one person had experience with it. However, the availability of learning resources and community support should mitigate this challenge over time.
- **Integration Efforts:** Efforts will be required to integrate React with our existing Java backend, ensuring seamless communication between frontend and backend components. Overall, the adoption of React aligns with our goal of transitioning to a web-based architecture while leveraging modern technologies to enhance the functionality and usability of our application.