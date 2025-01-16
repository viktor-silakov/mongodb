Feature: Check checkboxes
    Scenario: Check checkboxes
        Given I open url "/?component=checksandselects"

        Then the element with label "Checkbox by Label" should not be checked
        When I check on the element with label "Checkbox by Label"
        Then the element with label "Checkbox by Label" should have value "on"
        Then the element with label "Checkbox by Label" should be checked

        Then the element with name "checkbox2" should not be checked
        When I check on the element with name "checkbox2"
        Then the element with name "checkbox2" should be checked
