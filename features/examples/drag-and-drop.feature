Feature: Drag and drop
    Scenario: Drag and drop
        When I open url "/?component=draganddrop"

        Then the element with text "Item 1, Item 2, Item 3, Item 4" should be visible
        When I drag the listitem with name "Item 1" and drop it on the listitem with name "Item 2"
        Then the element with text "Item 2, Item 1, Item 3, Item 4" should be visible

