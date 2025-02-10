Feature: Smoke Test

    Scenario: Smoke Test - check hero component title
        Given I open site "/aqa-hero-page"
        Then the heading with name "Hero Component" should be visible
        Then the 2st element with selector "##hero" should contain text "AQA TEST PILL"

