@smoke @skip
Feature: Smoke

  Scenario: Smoke
    Given I open url "/"
    # When I click on the "Submit" button
    When I click on the button with name "Submit"
    When I pause the test execution

    When I execute javascript:
      """
      document.getElementById('rememberMe').style.margin = '-7px'
      """
    When the "page" visual snapshot matches "Smoke"
    When the "[aria-label='Log In']" visual snapshot matches "Submit button"
    When the "full page" visual snapshot matches "Smoke full page"
