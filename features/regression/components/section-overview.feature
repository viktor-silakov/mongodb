Feature: Section Overview

    Background:
        When I map page locators
            """
            Component: "##bonsai-SectionOverview"
            CTA Button: "##flora-BrandedIcon"
            CTA Link: "##flora-Link-Text"
            """

    Scenario Outline: <Name> - UI
        Given I open site "/aqa-section-overview-page"
        # When I accept site cookies
        Then the <Number>st "<Component>" visual snapshot matches "<Name>"

        When I hover on the <Number CTA button>st element with selector "<CTA Button>"
        Then the <Number>st "<Component>" visual snapshot matches "<Name> - CTA button hover"

        When I hover on the <Number CTA link>st element with selector "<CTA Link>"
        Then the <Number>st "<Component>" visual snapshot matches "<Name> - CTA link hover"

        Examples:
            | Number | Name                     | Number CTA button | Number CTA link |           
            | 1      | Light Overview           | 17                | 57              | 
            | 2      | Blue Overview Rounded    | 18                | 58              | 
            | 3      | Green Database Rounded   | 19                | 59              | 
            | 4      | Blue Database fullwidth  | 20                | 60              |
            | 5      | Green Database fullwidth | 21                | 61              |
