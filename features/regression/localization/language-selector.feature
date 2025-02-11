Feature: Verify language selection updates the page translation accordingly

    Scenario Outline: Verify language selection updates the page translation accordingly
        When I open site "/products/platform/atlas-vector-search/getting-started"
        When I select the "<language>" language
        When I take a "<language>" snapshot of the page
        When I pause the test execution

        Examples:
            | language  |
            | English   |
            # | Português |
            # | Español   |
            # | 한국어    |
            # | 日本語    |
            # | Italiano  |
            # | Deutsch   |
            # | Français  |
            # | 简体中文  |








