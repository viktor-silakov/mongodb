Feature: Getting Started- Section Overview

    Background:
        When I map page locators
            """
            Component: "##bonsai-SectionOverview"
            CTA Button: "##flora-BrandedIcon"
            CTA Link: "##flora-Link-Text"
            """

    Scenario Outline: Getting Started- Section Overview UI - <Name>
        # e.g.: https://mycelium-qa16.website.staging.corp.mongodb.com/aqa-pdp-getting-started
        Given I open site "/aqa-getting-started"
        Then the <Number>st "<Component>" visual snapshot matches "Getting Started - Section Overview - <Name>"

        When I hover on the <Number CTA button>st element with selector "<CTA Button>"
        Then the <Number>st "<Component>" visual snapshot matches "Getting Started- Section Overview - <Name> - CTA button hover"

        When I hover on the <Number CTA link>st element with selector "<CTA Link>"
        Then the <Number>st "<Component>" visual snapshot matches "Getting Started- Section Overview - <Name> - CTA link hover"

        Examples:
            | Number | Name      | Number CTA button | Number CTA link |
            | 1      | Blue      | 17                | 55              |
            | 2      | Green     | 18                | 56              |
            | 3      | Light     | 19                | 57              |
            | 4      | Big Green | 20                | 58              |

