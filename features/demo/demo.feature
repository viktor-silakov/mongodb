@smoke
Feature: Demo

  Background:
    When I map page locators
      """
      "Demo Form": "//*[.='Demo MongoDB Atlas for free']/.."
      "Demo Button": "//*[.='Demo MongoDB Atlas for free']/..//a"
      "Explore MongoDB Atlas Header": "//h1[.='Explore MongoDB Atlas']"
      "Registration Form": "//*[contains(@class, 'css-eimrqs')]"
      "Email Address": "//input[@name='emailAddress']"
      "First Name": "//input[@name='firstName']"
      "Last Name": "//input[@name='lastName']"
      "Password": "//input[@name='password']"
      "Sign Up Button": "//button[@data-testid='submitButton']"
      """

  @demo-mongodb-atlas-for-free @smoke
  Scenario: Demo MongoDB Atlas for free

    Given I open url "https://www.mongodb.com/products/platform/atlas-database"

    When I scroll on the element with selector "<Demo Form>"

    When I execute javascript:
      """
    const xpath = "//*[.='Demo MongoDB Atlas for free']/..//a";
    const button = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        button.style.backgroundColor = "red";

      """

    Then the "<Demo Form>" visual snapshot matches "MongoDB Demo Form"
    Then the "<Demo Button>" visual snapshot matches "MongoDB Demo Button - before hook"

    When I hover on the element with selector "<Demo Button>"
    And I wait for 1 seconds
    Then the "<Demo Button>" visual snapshot matches "MongoDB Demo Button - after hook"

    And I click on the element with selector "<Demo Button>"
    And I wait 15 seconds for the element with selector "<Explore MongoDB Atlas Header>" to be visible

    And the "<Explore MongoDB Atlas Header>" visual snapshot matches "MongoDB Explore MongoDB Atlas Header"

    When I pause the test execution



  # When I execute javascript:
  #   """
  #   const xpath = "//*[.='Demo MongoDB Atlas for free']/..//a";
  #   const button = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  #       button.style.backgroundColor = "red";

  #   """

  @user-registration
  Scenario: User Registration
    When I open url "https://account.mongodb.com/account/register"
    And I type the element with selector "<Email Address>" with "test@example.com"
    And I type the element with selector "<First Name>" with "John"
    And I type the element with selector "<Last Name>" with "Doe"
    And I type the element with selector "<Password>" with "SecurePassword123"

# And I click on the element with selector "<Sign Up Button>"


