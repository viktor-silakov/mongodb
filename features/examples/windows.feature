Feature: Windows
    Scenario: Set windows size
        When I open url "/?component=filling"
        When I set the browser window size to 100 by 150
        When I execute javascript:
            """
            var a = {height: window.innerHeight, width: window.innerWidth}
            JSON.stringify(a);
            """

        Then the stored value "javascript" should be equal to:
            """
            {"height":150,"width":100}
            """

        Scenario: Switch between tabs
           When I open url "/?component=clicking"
           When I click on the button with name "Open Filling Page in New Tab"
           When I wait for 1 seconds
           When I switch to the tab with title containing "Filling"
           # FixMe
           # Then the page title should be '/Filling/'
           When the element with text "Filling & Keys" should be visible

           When I switch to the tab with title containing "Clicking"
           When the element with text "Clicking Test Page" should be visible

        

        