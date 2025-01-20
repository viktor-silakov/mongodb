Feature: Hero Component

    Scenario: Hero Component
        Given I open site "/vf-hero-video-vimeo"
        When I scroll on the element with selector "##hero"
        Then the "##hero" visual snapshot matches "Hero Component"


        When I pause the test execution


