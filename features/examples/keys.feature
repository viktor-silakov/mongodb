@fixme
Feature: Keys
    Scenario: Keystrokes
        When I open url "/?component=filling"
        When I wait for 1 seconds
        When I click on the element with placeholder "Placeholder attribute"
        When I wait for 1 seconds
        When I press the element with tag "input" with "Control+B"
        When I wait for 1 seconds
