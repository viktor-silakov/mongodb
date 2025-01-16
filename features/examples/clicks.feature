@smoke
Feature: Clicks on elements

  Background:
    When I open url "/?component=clicking"

  Scenario: Clicking on elements
    # by aria roles
    Then the element with role "alertdialog" should not be visible
    When I click on the heading with name "Heading role"
    # When I pause the test execution
    Then the element with text "You clicked on: Heading role" should be visible
    And the element with role "alertdialog" should be visible

    When I click on the button with name "Button role"
    Then the element with text "You clicked on: Button role" should be visible

    When I click on the checkbox with name "Checkbox role"
    Then the element with text "You clicked on: Checkbox role" should be visible

    # by various attributes
    When I click on the element with placeholder "Placeholder attribute"
    Then the element with text "You clicked on: Placeholder attribute" should be visible
    When I click on the element with text "Text attribute (click me)"
    Then the element with text "You clicked on: Text attribute" should be visible
    When I click on the element with alt-text "Alt text attribute"
    Then the element with text "You clicked on: Alt text attribute" should be visible
    When I click on the element with title "Title attribute"
    Then the element with text "You clicked on: Title attribute" should be visible
    When I click on the element with test-id "test-id-attribute"
    Then the element with text "You clicked on: Test ID attribute" should be visible
