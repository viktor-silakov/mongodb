@smoke
Feature: Demo - MongoDB

  Background:
    When I map page locators
      """
      "Global Header Desktop": "//*[@class='css-1n2f1gu']"
      "Global Header Mobile": "//*[@class='css-jjdgf8']"
      "Develop in your language Section": "(//*[@class='css-90an19'])[2]"
      "Section card": "(//*[@class='css-qcbqju'])[1]"
      "Pricing button": "//*[@class='css-1h3lf6v']"
      "Search button": "//*[@class='css-1azqjr9']"
      "JavaScript checkbox": "(//*[@aria-label='JavaScript-ProgrammingLanguage']//span)[1]"
      "Email Address": "//input[@name='emailAddress']"
      "First Name": "//input[@name='firstName']"
      "Last Name": "//input[@name='lastName']"
      "Password": "//input[@name='password']"
      "Sign Up Button": "//button[@data-testid='submitButton']"
      """

  @demo-mongodb @smoke @UI
  Scenario Outline: Develop in your language Section - UI [<Breakpoint>]
    Given I set the browser window size to <width> by 800
    When I open url "https://www.mongodb.com/developer/"
    And I wait for 3 seconds
    And I hide the element with selector "<Global Header Desktop>"
    And I hide the element with selector "<Global Header Mobile>"

    And I scroll on the element with selector "<Develop in your language Section>"
    Then the "<Develop in your language Section>" visual snapshot to match "Language Section"

    When I hover on the element with selector "<Section card>"
    Then the "<Develop in your language Section>" visual snapshot to match "Language Section on Card hover"

    Examples:
      | Breakpoint | width |
      | Desktop    | 1400  |
      | Tablet     | 1000  |
      | Mobile     | 375   |

  @Functional
  Scenario: Global Navigation - Functional
    Given I open url "https://www.mongodb.com/developer/"

    And I wait for 3 seconds
    And I click on the element with selector "<Pricing button>"
    And I wait for 5 seconds
    Then the url should be 'https://www.mongodb.com/pricing'

  @demo-mongodb @search @Functional
  Scenario: Search - Functional
    Given I open url "https://www.mongodb.com/developer/"
    And I wait for 3 seconds
    And I scroll on the element with selector "#search"
    And I type the element with selector "#search" with "Tutorial Building"
    And I click on the element with selector "<Search button>"
    Then I wait 10 seconds for the element with text "4 Results for \"Tutorial Building\"" to be visible
    And I wait for 5 seconds
    And I click on the element with selector "<JavaScript checkbox>"
    And I wait for 3 seconds
    Then I wait 10 seconds for the element with text "1 Result" to be visible


  @user-registration @Functional
  Scenario: User Registration
    When I open url "https://account.mongodb.com/account/register"
    And I type the element with selector "<Email Address>" with "test@example.com"
    And I type the element with selector "<First Name>" with "John"
    And I type the element with selector "<Last Name>" with "Doe"
    And I type the element with selector "<Password>" with "SecurePassword123"


  Scenario: Login debug
    Given I open site "/vf-hero-video-vimeo"
    Then I click on the element with label "Select Password."
    When I type the element with selector "#input72" with "123"
    # When I type the element with selector "" with ""
    # When I pause the test execution
    When I click on the button with name "Verify"
    # When I pause the test execution

    When I wait for 10 seconds
    When I set cookie storage with key "OptanonConsent" and value "isGpcEnabled%3D0%26browserGpcFlag%3D0%26isIABGlobal%3Dfalse%26hosts%3D%26landingPath%3DNotLandingPage%26groups%3DC0001%3A1%2CC0002%3A1%2CC0003%3A1%2CC0004%3A1%2CC0005%3A1%26geolocation%3DDE%3BHE%26AwaitingReconsent%3Dfalse"
    When I set cookie storage with key "OptanonAlertBoxClosed" and value "2025-01-15T13:37:31.350Z"
    When I refresh the page
    When I pause the test execution

  @demo-mongodb @smoke @UI
  Scenario: Login debug-2
    Given I open site "/vf-hero-video-vimeo"
    When I pause the test execution

