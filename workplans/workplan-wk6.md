# Workplan 05/06/2024


## Sprint Structure
- 1 week each
- Milestones have 2 sprints, for a total 3 milestones
- Start and end on Monday
- We have weekly meetings at 3:00 PM on Monday to discuss tasks
- Meeting structure:
  - First few minutes: update on status/retrospections/reports.
  - Next: Discuss this sprint’s tasks, priorities, time estimates, and assign them
  - Next: Update the Github
  - Next: Group work
- Primarily work within roles
  - Each role/team will divide and assign their given tasks amongst themselves and upload those sub-tasks to the Github board
  - **Roles**:
    - **Frontend**: Andrew, Alexis, Ethan, (Daniel)
    - **Backend**: Bernie, Karl, Matthew, (Jett)
    - **Testing** (with CI/CD responsibilities): Jett(backend), Daniel (frontend)
      - (Will help out with frontend and backend if they have time)
    - **Support** : Xavier
      - fire brigade, the person whose project we chose
      - they will be assigned to whichever end has the most work during the sprint but primary task is to help all sections by clarifying code or other things
- Post updates in discord every other day


## User Stories
Remain the same as we all had midterms last week and did not anticipate finishing all of them in the last sprint.
- As a developer, I want to refactor the app to a web app so that it is more accessible for users
- As a user, I want the app to be a web app so that I can access the account across all my devices
  - Essentially same story but from two perspectives


## Tasks
### Backend
TODO:
 - Set up a webserver (using github pages)
   - Priority: High
     - We need webserver to host the app so it is the highest priority
    - Estimate: 6 hours
      - People that have set up webservers using github pages say its easy 

### Frontend
TODO:
 - Convert each JavaFX file into a web app language
   - Priority: High
     - We need the files in a web app language and not JavaFX so that we can host it on GitHub pages.
    - Estimate: 20 hours
      - We think this will take a long time as some frontend people are not familiar with web development.
    - Subtasks:
      - Convert JavaFX UI to HTML/CSS
      - Convert JavaFX Event Handlers to JavaScript
      - Create a JavaScript Controller
      - Create a JavaScript Model

### Testing
TODO:
 - Assist other teams with their tasks
 - Priority: Low
   - Testing team members are not a key component to to either frontend or backend and should only do this task if nothing else to do 
  - Estimate: 4 hours
DONE:
 - Setup up the Github repo
     - Priority: High
        - We need access to the repo before we can start working
     - Estimate: 2 hours
        - Only need to share access and set up/verify CI/CD pipeline


## Sequencing Information
![Sequencing Information](https://github.com/CSE112-Team-10/Team10-PantryPals/blob/main/workplans/Sequencing-information-wk5.png "Sequencing Information")

Our primary focus this week was to finilize which project we are working on and discuss the specific tasks and features we will implement. 

## Current Overall Plan
 - Milestone 1: Refatoring
   - Update original repository from a JavaFX app to a web app
   - If time left in milestone, start adding features

- Milestone 2: Add features
  - Some features we are thinking about:
    - Text input
    - Input cuisine, number of servings, difficultly, cook time
    - encrypt password
    - prompt GPT to add/delete selected step
    - Quality control
      - Make sure generated recipe is safe for consumption

- Milestone 3: Quality Control:
  - Bug checks
  - Ensure decent load speed
    - Definition of decent to be discussed later
  
