Feature: Upload
    Scenario: Upload file
        When I open url "/?component=filling"
        
        Then the element with text "hello.txt" should not be visible
        When I upload the "./test-data/hello.txt" file for the element with id "file-upload"
        Then the element with text "hello.txt" should be visible

