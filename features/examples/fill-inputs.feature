Feature: Fill Inputs
    Scenario: Fill Inputs
        When I open url "/?component=filling"
        When I fill the element with placeholder "Placeholder attribute" with "Test123"
        Then the element with placeholder "Placeholder attribute" should have value "Test123"
        When I fill the element with label "Placeholder" with "Test456"
        Then the element with placeholder "Placeholder attribute" should have value "Test456"

        When I type the element with label "Placeholder" with "asd"
        Then the element with placeholder "Placeholder attribute" should have value "Test456asd"

