Feature: Sign In

    Background:
        When I map page locators
            """
            Sign In: "//span[text()='Sign In']"
            Try Free: "//a[text()='Try Free']"
            Sign In Form: ".css-1sags8k"
            Try Free Form: ".react-root"
            Accept Cockoies button: "button#onetrust-accept-btn-handler"
            """

    @TC-208 @regression
    Scenario: Check if Sign In and Try Free CTAs are working as expected
        Given I open site "/products/integrations/bi-connector"
        When I click on the element with selector "<Sign In>"
        Then the "<Sign In Form>" visual snapshot matches "Sign In Form"
        When I open site "/products/integrations/bi-connector"
        And I click on the element with selector "<Try Free>"
        And I wait 5 seconds for the element with selector "<Accept Cockoies button>" to be visible
        And I click on the element with selector "<Accept Cockoies button>"
        Then the "<Try Free Form>" visual snapshot matches "Try Free Form"