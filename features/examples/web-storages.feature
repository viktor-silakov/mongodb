Feature: Web storages

  Background:
    When I open url "/?component=storagetester"

  Scenario: Get/Set/Delete Storages key-value
    # localStorage
    When I set localStorage storage with key "localStorageTestKey" and value "localStorageTestValue"
    When I refresh the page
    Then the element with text "localStorageTestKey: localStorageTestValue" should be visible

    When I get localStorage storage with key "localStorageTestKey" and value "localStorageTestValue"
    Then the stored value "localStorage" should be equal to:
      """
      localStorageTestValue
      """

    When I delete localStorage storage with key "localStorageTestKey"
    When I refresh the page
    Then the element with text "localStorageTestKey: localStorageTestValue" should not be visible


    # sessionStorage
    When I set sessionStorage storage with key "sessionStorageTestKey" and value "sessionStorageTestValue"
    When I refresh the page
    Then the element with text "sessionStorageTestKey: sessionStorageTestValue" should be visible
    Then the stored value "sessionStorage" should be equal to:
      """
      sessionStorageTestValue
      """
    When I delete sessionStorage storage with key "sessionStorageTestKey"
    When I refresh the page
    Then the element with text "sessionStorageTestKey: sessionStorageTestValue" should not be visible

    # cookie
    When I set cookie storage with key "cookieTestKey" and value "cookieTestValue"
    When I refresh the page
    Then the element with text "cookieTestKey: cookieTestValue" should be visible
    Then the stored value "cookie" should be equal to:
      """
      cookieTestValue
      """

    When I delete cookie storage with key "cookieTestKey"
    When I refresh the page
    Then the element with text "cookieTestKey: cookieTestValue" should not be visible

  Scenario: Clear all cookies
    When I set cookie storage with key "cookieTestKey" and value "cookieTestValue"
    When I refresh the page
    Then the element with text "cookieTestKey: cookieTestValue" should be visible

    When I clear all cookies
    When I refresh the page
    Then the element with text "cookieTestKey: cookieTestValue" should not be visible

