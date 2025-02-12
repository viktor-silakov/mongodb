@localization @TC-712
Feature: Verify language selection updates the page translation accordingly

    @desktop-only
    Scenario Outline: Verify language selection updates the page translation accordingly
        When I open site "/"
        When I select the "<language>" language
        Then the page matches the snapshot "<language>"
        # When I pause the test execution

        Examples:
            | language  |
            | English   |
            | Português |
            | Español   |
            | 한국어    |
            | 日本語    |
            | Italiano  |
            | Deutsch   |
            | Français  |
            | 简体中文  |







