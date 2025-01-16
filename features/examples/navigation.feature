Feature: Navigation
    Scenario: Go back/forward
        When I open url "/?component=login"
        Then the page title should be 'Login Page - Playwright-bdd boilerplate test app'

        When I open url "/?component=filling"
        Then the page title should be 'Filling & Keys - Playwright-bdd boilerplate test app'

        When I go back
        Then the page title should be 'Login Page - Playwright-bdd boilerplate test app'

        When I go forward
        Then the page title should be 'Filling & Keys - Playwright-bdd boilerplate test app'

    Scenario: Refresh
        Given I open url "/?component=checksandselects"
        When I select the element with label "Choose a color" with "Blue"

        Then the element with label "Choose a color" should have value "blue"

        When I refresh the page
        Then the element with label "Choose a color" should have value ""

