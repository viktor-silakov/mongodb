@localization @TC-711
Feature: Language Retention on Navigation

    Background:
        When I map page locators
            """
            Register Button: "//a[contains(@href, 'cloud/atlas/register') and contains(@class, 'header-desktop-button')]"
            """
    
    @desktop-only
    Scenario Outline: Language Retention on Navigation
        # https://mycelium-staging.website.staging.corp.mongodb.com/
        When I open site "/"
        When I select the "<language>" language
        When I click on the 1st element with selector "<Register Button>"
        When the url should be '/.*<url>/'
        Then the heading with name "<title>" should be visible

        Examples:
            | language  | title          | url                             |
            | English   | Sign up        | \/cloud\/atlas\/register        |
            | Português | Crie uma conta | \/pt-br\/cloud\/atlas\/register |
            | Español   | Registrarse    | \/es\/cloud\/atlas\/register    |
            | 한국어    | 등록하기       | \/ko-kr\/cloud\/atlas\/register |
            | 日本語    | Sign up        | \/cloud\/atlas\/register        |
            | Italiano  | Registrati     | \/it-it\/cloud\/atlas\/register |
            | Deutsch   | Anmelden       | \/de-de\/cloud\/atlas\/register |
            | Français  | S'inscrire     | \/fr-fr\/cloud\/atlas\/register |
            | 简体中文  | 注册           | \/zh-cn\/cloud\/atlas\/register |
