Feature: PDP Features - Section Overview

    Background:
        When I map page locators
            """
            Component: "##bonsai-Container"
            CTA Button: "##flora-BrandedIcon"
            CTA Link: "##flora-Link-Text"
            """

    Scenario Outline: Section Overview UI - <Name>
        # e.g.: https://mycelium-qa16.website.staging.corp.mongodb.com/-aqa-pdp-features
        Given I open site "/-aqa-pdp-features"
        Then the <Number>st "<Component>" visual snapshot matches "PDP Features Section Overview - <Name>"

        When I hover on the <Number CTA button>st element with selector "<CTA Button>"
        Then the <Number>st "<Component>" visual snapshot matches "PDP Features Section Overview - <Name> - CTA button hover"

        When I hover on the <Number CTA link>st element with selector "<CTA Link>"
        Then the <Number>st "<Component>" visual snapshot matches "PDP Features Section Overview - <Name> - CTA link hover"

        Examples:
            | Number | Name  | Number CTA button | Number CTA link |
            | 1      | Blue  | 17                | 55              |
            | 2      | Light | 18                | 56              |
