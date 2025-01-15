Feature: Keys
    Scenario: Keystrokes
        When I open url "/?component=filling"

        When I execute javascript:
            """
            String(document.querySelector('[placeholder="Placeholder attribute"]') === document.activeElement)
            """
        Then the stored value "javascript" should be equal to:
            """
            false
            """
        When I focus on the element with placeholder "Placeholder attribute"

        When I execute javascript:
            """
            String(document.querySelector('[placeholder="Placeholder attribute"]') === document.activeElement)
            """
        Then the stored value "javascript" should be equal to:
            """
            true
            """
