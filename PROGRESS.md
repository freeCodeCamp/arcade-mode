# PROGRESS for Arcade Mode

## Saturday 5/13/17:

## Friday 5/12/17:
### Tim:
  - Progress:
    1. Transform Redux code to now use Immutable.js.
    2. Implement tests for all slice reducers.
    3. Implement reselect's memoized selector for mapStateToProps calls.

### Tuomas:
  - Progress:
    1. Added Istanbul for code coverage.
    2. Added script bin/port_tests.pl to create test files for all source files
    3. Added coverage scripts to bin/cover_test_client|server.sh + npm scripts.

## Thursday 5/11/17:
### Tim:
  - Progress:
    1. Add opening modal to app.
    2. Decompose ArcadeAction and ArcadeReducer down into smaller pieces.

### Tuomas:
  - Progress:
    1. Added `Insert Solution` button for quick testing.
    2. Did Minor UX improvements, showing/hiding of buttons.
    3. Added score to Navbar + Game Over screen after timer runs out.

## Wednesday 5/10/17:
### Tim:
  - Progress:
    1. Add user output box to the left panel.
    2. Add challenge title and description to left panel.
    3. Move the display of challenge information after user presses start.
    4. Add ability to continue to the next challenge after passing all tests.

### Tuomas:
  - Progress:
    1. Test case results are now shown on the left panel of the application.
    2. Added configurable timer which starts when a user starts a session.

## Tuesday 5/9/17:
### Tim:
  - Progress:
    1. Set up WebWorker to handle evaluation of user defined code.
      - User code execution hook generated; will be used for the code output window.
      - Test cases can now be evaluated, though still need to map the case to the result.

### Tuomas:
  - Progress:
      1. Added react-codemirror component and integrated with redux code.

## Monday 5/8/17:
### Tim:
  - Progress:
    1. Set up app on heroku: https://arcademode.herokuapp.com
    2. Create a head script to enforce https on the Heroku app.
    3. Implement react-bootstrap as a possible solution to UI design; initialize navbar
    4. Initialize info panel and editor sections

### Tuomas:
  - Progress:
    1. Added redux code with action, container (App.jsx) and reducer.
    2. Created sample unit test file (test/ArcadeAction.spec.js) for first redux actions.

## Sunday 5/7/17:
### Tim:
  - Progress:
    1. Set up gulp tasks for all major file types; set up gulp watch tasks
    2. Add mongoose setup code; revisit following completion of client-side UI


### Tuomas:
  - Progress:
    1. Added Enzyme + first unit test for Header component following an example from [Testing React components with Enzyme and Mocha](https://semaphoreci.com/community/tutorials/testing-react-components-with-enzyme-and-mocha)

## Saturday 5/6/17:
### Tim:
  - Progress:
    1. Set up directory structure
    2. Set up minimal placeholder files to test gulp task
    3. Initialize gulp task for transpiling JSX/ES6 -> ES5
