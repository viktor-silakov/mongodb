Feature: Hero Component

    Background:
        When I map page locators
            """
            Play button: "[data-testid='play-button']"
            Hero Component: "##hero"
            Video: "body"
            Video Iframe: "iframe[title='vf-test-video']"
            Video Iframe Parent: "//iframe[@title='vf-test-video']/.."
            CTA button: "[automation-testid='hero__cta__button']"
            CTA link: "##hero__cta__link"
            """

    Scenario: Hero Component
        Given I open site "/vf-hero-video-vimeo"

        # check hero component
        When I scroll on the element with selector "<Hero Component>"
        Then the "<Hero Component>" visual snapshot matches "Hero Component"

        # hover checks for CTA elements
        When I hover on the element with selector "<CTA button>"
        Then the "<Hero Component>" visual snapshot matches "Hero Component CTA button hover"

        When I hover on the element with selector "<CTA link>"
        Then the "<Hero Component>" visual snapshot matches "Hero Component CTA link hover"

        # video popup
        When I click on the element with selector "<Play button>"
        When I switch to the iframe with selector "<Video Iframe>"
        Then the "<Video>" visual snapshot matches "Hero Component Modal Video"
        When I switch to the iframe with selector "<Video Iframe>"



