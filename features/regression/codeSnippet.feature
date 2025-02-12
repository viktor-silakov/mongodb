Feature: Code Snippet Component

    Background:
        When I map page locators
            """
            Code Pannel Component: ".col-span-7 div[aria-label='code-panel-wrapper']"
            Code Snippet Section 2: "(//h6[@class='css-felna8'])[2]"
            JS Tab: (//div[@tabindex="0" and text()="Javascript"])[4]
            Java Tab: (//div[@tabindex="0" and text()="Java"])[4]
            MongoShell Tab: (//div[@tabindex="0" and text()="MongoShell"])[4]
            Copy Code Button: "(//*[@title='Copy Code'])[4]"
            """

    @TC-351 @regression
    Scenario: Verify Code Snippet
        Given I open site "/products/tools/mongodb-query-api"
        When I scroll on the element with selector "<Code Pannel Component>"
        Then the "<Code Pannel Component>" visual snapshot matches "Code Snippet"
        # check code snippet section 2
        When I click on the element with selector "<Code Snippet Section 2>"
        Then the "<Code Pannel Component>" visual snapshot matches "Code Snippet 2"
        # check Javascript tab with code snippet
        When I click on the element with selector "<JS Tab>"
        Then the "<Code Pannel Component>" visual snapshot matches "Code Snippet JS"
        # check Java tab with code snippet
        When I click on the element with selector "<Java Tab>"
        Then the "<Code Pannel Component>" visual snapshot matches "Code Snippet Java"
        # check MongoShell tab with code snippet
        When I click on the element with selector "<MongoShell Tab>"
        Then the "<Code Pannel Component>" visual snapshot matches "Code Snippet MongoShell"
        # check hover on copy code button
        When I hover on the element with selector "<Copy Code Button>"
        Then the "<Code Pannel Component>" visual snapshot matches "Code Snippet Copy Button hover"
        # check click on copy code button
        When I click on the element with selector "<Copy Code Button>"
        Then the "<Code Pannel Component>" visual snapshot matches "Code Snippet Copy Button click"