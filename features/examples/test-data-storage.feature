Feature: Test Data Fixture - Storage

    Scenario: Storages - evaluate object using JSON schema by name
        When I store the "obj1" as:
            """
            {
                "num1": 1,
                "num2": 10,
                "str1": "aaaa"
            }
            """

        Then I evaluate the stored object of "obj1" using JSON schema:
            """
            {
                "num1": {
                    "type": "integer",
                    "minimum": 1,
                    "maximum": 100
                },
                "num2": {
                    "type": "integer",
                    "minimum": 5,
                    "maximum": 50
                },
                "str1": {
                    "type": "string",
                    "pattern": "^[a-z]{4}$"
                }
            }
            """

    Scenario: Storages - evaluate object using JS schema by name
        When I store the "obj_for_js" as:
            """
            {
                "num1": 1,
                "num2": 10,
                "str1": "aaaa"
            }
            """

        Then I evaluate the stored value of "obj_for_js" using JS:
            """
            {
                "fun": "(data) => data.str1",
                "expected": "aaaa"
            }
            """

    Scenario: Storages - evaluate object using JS schema by index, last stored value
        When I store the "obj_for_js" as:
            """
            {
                "num1": 1,
                "num2": 10,
                "str1": "aaaa"
            }
            """

        Then I evaluate the last stored value using JS:
            """
            {
                "fun": "(data) => data.str1",
                "expected": "aaaa"
            }
            """

    Scenario: Storages - evaluate object using JSON schema by index, last stored value
        When I store the "obj_last" as:
            """
            {
                "num1": 1,
                "num2": 10,
                "str1": "aaaa"
            }
            """

        Then I evaluate the last stored object using JSON schema:
            """
            {
                "num1": {
                    "type": "integer",
                    "minimum": 1,
                    "maximum": 100
                },
                "num2": {
                    "type": "integer",
                    "minimum": 5,
                    "maximum": 50
                },
                "str1": {
                    "type": "string",
                    "pattern": "^[a-z]{4}$"
                }
            }
            """

    Scenario: Storages - evaluate last stored text for equality
        When I store the "text_for_equality" as:
            """
            This is a test string
            """

        Then the last stored text should be equal to:
            """
            This is a test string
            """

    Scenario: Storages - evaluate last stored text for containment
        When I store the "text_with_substring" as:
            """
            This is a test string with a substring
            """

        Then the last stored text should contain:
            """
            substring
            """

    Scenario: Storages - evaluate last stored text for non-containment
        When I store the "text_without_substring" as:
            """
            This is a test string without that word
            """

        Then the last stored text should not contain:
            """
            missingword
            """

    Scenario: Storages - evaluate last stored object for equality
        When I store the "object_for_equality" as:
            """
            {
                "key1": "value1",
                "key2": 2,
                "key3": true
            }
            """

        Then the last stored object should be equal to:
            """
            {
                "key1": "value1",
                "key2": 2,
                "key3": true
            }
            """

    Scenario: Storages - evaluate last stored object for matching
        When I store the "object_for_schema" as:
            """
            {
                "name": "John Doe",
                "age": 30,
                "active": true
            }
            """

        Then the last stored object should match:
            """
            {
                "name": "John Doe",
                "age": 30
            }
            """
