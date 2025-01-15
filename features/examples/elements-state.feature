Feature: Element states

    Background:
        When I open url "/?component=elementsstates"

    Scenario: Single element states
        # present
        Then the element with test-id "present-element" should be present
        # display:"none" https://playwright.dev/docs/actionability#visible
        Then the element with test-id "present-element" should not be visible
        Then the element with test-id "not-present-element" should not be present

        # viewport
        When I scroll on the element with test-id "viewport-element"
        Then the element with test-id "viewport-element" should be in viewport
        And the element with test-id "not-viewport-element" should not be in viewport

        When I scroll on the element with test-id "not-viewport-element"
        And the element with test-id "not-viewport-element" should be in viewport

        # focusable
        Then the element with test-id "focusable-input" should not be focused
        When I click on the element with test-id "focusable-input"
        Then the element with test-id "focusable-input" should be focused

        # enabled
        Then the element with test-id "toggle-enabled-input" should be enabled
        Then the element with test-id "toggle-enabled-input" should be editable
        When I click on the button with name "Toggle enable button status"
        # When I click on the "Toggle enable button status" button
        Then the element with test-id "toggle-enabled-input" should not be enabled
        Then the element with test-id "toggle-enabled-input" should not be editable

    Scenario: Multiple element state
        When there should be 4 element with text "Check visibility" that are visible
        When there should be 4 element with text "Check visibility" that are present
        
        When I click on the element with test-id "btn-0"
        When I click on the element with test-id "btn-1"
        When there should be 2 element with text "Check visibility" that are visible
        When there should be 4 element with text "Check visibility" that are present

