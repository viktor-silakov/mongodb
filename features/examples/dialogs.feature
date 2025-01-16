Feature: Dialogs

    Scenario: Dialogs
        When I open url "/?component=modal"
        When I setup accept the dialog event
        When I click on the button with name "Show Alert"

        Then the element with text "You accepted the confirmation" should not be visible
        When I setup accept the dialog event
        When I click on the button with name "Show Confirm Dialog"
        Then the element with text "You accepted the confirmation" should be visible

        When I setup dismiss the dialog event
        When I click on the button with name "Show Confirm Dialog"
        Then the element with text "You dismissed the confirmation" should be visible

        Then the element with text "Hello, Oboba!" should not be visible
        When I setup accept the dialog event with text "Oboba"
        When I click on the button with name "Show Prompt Dialog"
        Then the element with text "Hello, Oboba!" should be visible
