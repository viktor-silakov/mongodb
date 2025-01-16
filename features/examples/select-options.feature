Feature: Select Options

    Scenario: Select options
        Given I open url "/?component=checksandselects"
        When I select the element with label "Choose a color" with "Blue"

        Then the element with label "Choose a color" should have value "blue"
