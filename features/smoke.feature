Feature: Smoke Test

    Scenario: Smoke Test - check hero component title
        Given I open site "/products/platform/atlas-vector-search/getting-started"
        # When I pause the test execution
        Then the heading with name "Getting started with Atlas" should be visible

