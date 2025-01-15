@slow
Feature: Wait for certain state
    Background:
        When I open url "/?component=statetesting"

    Scenario: Visibility
        When I click on the button with name "Toggle visibility"
        Then the element with text "This element is visible" should not be visible
        When I wait 25 seconds for the button with name "Toggle visibility" to be visible
        And I click on the button with name "Toggle visibility"
        Then I wait 25 seconds for the element with text "This element is visible" to be visible

    Scenario: Change button text
        When I click on the button with name "Initial Text"
        Then I wait 25 seconds for the button with name "Updated Text" to have text "Updated Text"

    Scenario: Toggle button enabled state
        When I click on the button with name "Enabled Button"
        Then I wait 25 seconds for the button with name "Enabled Button" to not be visible
        Then I wait 25 seconds for the button with name "Disabled Button" to not be enabled
        Then the element with text "Disabled Button" should be visible
        
    Scenario: Toggle input editability
        When I click on the button with name "Toggle editable"
        Then I wait 25 seconds for the element with placeholder "Non-editable input" to not be editable
        When I click on the button with name "Toggle editable"
        Then I wait 25 seconds for the element with placeholder "Editable input" to be editable