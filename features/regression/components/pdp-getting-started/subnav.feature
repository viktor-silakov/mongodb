@components
Feature: PDP Getting Started - Subnav Component

    Background:
        When I map page locators
            """
            Subnav Component: "##flora-GridLayout"
            Nav Link: "##flora-TypographyScale"
            Subnav Dropdown: "[data-testid='dropdown-list']"
            """

    Scenario: PDP Getting Started - Subnav Component - Appearance
        # e.g.: https://mycelium-qa16.website.staging.corp.mongodb.com/aqa-pdp-getting-started
        Given I open site "/aqa-getting-started"

        Then the 1st "<Subnav Component>" visual snapshot matches "PDP Getting Started - Subnav Component"
        
        When I hover on the 4st element with selector "<Nav Link>"
        Then the 1st "<Subnav Component>" visual snapshot matches "PDP Getting Started - Subnav Component Hovered - Overview Link"

        When I hover on the 5st element with selector "<Nav Link>"
        Then the 1st "<Subnav Component>" visual snapshot matches "PDP Getting Started - Subnav Component Hovered - Features Link"

        When I hover on the 6st element with selector "<Nav Link>"
        Then the 1st "<Subnav Component>" visual snapshot matches "PDP Getting Started - Subnav Component Hovered - Security Link"

        When I hover on the 7st element with selector "<Nav Link>"
        Then the 1st "<Subnav Component>" visual snapshot matches "PDP Getting Started - Subnav Component Hovered - Pricing Link"

        When I click on the 8st element with selector "<Nav Link>"
        Then the 1st "<Subnav Dropdown>" visual snapshot matches "PDP Getting Started - Subnav Dropdown"

    Scenario: Subnav Component - Functional
        Given I open site "/aqa-pdp-overview"

        # Overview 
        When I click on the 4st element with selector "<Nav Link>"
        When the url should be '/.*\/products\/platform\/atlas-database/'
        When I go back

        # Features
        When I click on the 5st element with selector "<Nav Link>"
        When the url should be '/.*\/products\/platform\/atlas-database\/features/'
        When I go back

        # Security
        When I click on the 6st element with selector "<Nav Link>"
        When the url should be '/.*\/products\/capabilities\/security/'
        When I go back

        # Pricing
        When I click on the 7st element with selector "<Nav Link>"
        When the url should be '/.*\/pricing/'
        When I go back

