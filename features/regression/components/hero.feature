@skip
Feature: Hero Component

    Background:
        When I map page locators
            """
            Hero Component: "##hero"
            """

    Scenario Outline: Hero Component - <Name>
        Given I open site "/aqa-hero-page"
        When I scroll on the <Number>st element with selector "<Hero Component>"
        Then the <Number>st "<Hero Component>" visual snapshot matches "<Name>"
        Examples:
            | Number | Name                |
            | 1      | Main Title Hero     |
            | 2      | TC-706 Hero         |
            | 3      | TC-705 Explorer     |
            | 4      | TC-704 Vision       |
            | 5      | TC-703 Nexus        |
            | 6      | TC-702 Insight      |
            | 7      | TC-701 Core         |
            | 8      | TC-700 Elevate      |
            | 9      | The Main Title Hero |
            | 10     | TC-698 Frontier     |
            | 11     | TC-699 Horizon      |
            | 12     | Okta Identity Hero  |
            | 13     | Rocket Ignite Hero  |
