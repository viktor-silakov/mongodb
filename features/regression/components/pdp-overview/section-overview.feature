Feature: PDP Overview - Section Overview

    Background:
        When I map page locators
            """
            Component: "##bonsai-SectionOverview"
            CTA Button: "##flora-BrandedIcon"
            CTA Link: "##flora-Link-Text"
            """

    Scenario Outline: PDP Overview - Section Overview UI - <Name>
        # e.g.: https://mycelium-qa16.website.staging.corp.mongodb.com/aqa-pdp-overview
        Given I open site "/aqa-pdp-overview"
        Then the <Number>st "<Component>" visual snapshot matches "PDP Overview - Section Overview - <Name>"

        When I hover on the <Number CTA button>st element with selector "<CTA Button>"
        Then the <Number>st "<Component>" visual snapshot matches "PDP Overview - Section Overview - <Name> - CTA button hover"

        When I hover on the <Number CTA link>st element with selector "<CTA Link>"
        Then the <Number>st "<Component>" visual snapshot matches "PDP Overview - Section Overview - <Name> - CTA link hover"

        Examples:
            | Number | Name  | Number CTA button | Number CTA link |
            | 1      | Blue  | 17                | 55              |
            | 2      | Green | 18                | 56              |
            | 3      | Light | 19                | 57              |
