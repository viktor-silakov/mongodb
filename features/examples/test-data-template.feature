Feature: Test Data Fixture - Templating
    when the template engine handling some string it does it in the following order:
    - (item) => this.get(item), // stored data
    - (item) => (this.dataGenerator as any)[item], // generators
    - (item) => (constants)[item], // constants


    Scenario: Templates - stored data
        When I store the "val1" as:
            """
            text1
            """

        When I render the "template1" template:
            """
            stored - <val1>
            """
        Then I evaluate the stored value of "template1" using JS:
            """
            {
                "fun": "(data)=>data",
                "expected": "stored - text1"
            }
            """

    Scenario: Templates - stored data object
        When I store the "val1" as:
            """
            {
                "prop1": 123,
                "prop2": "test String",
                "prop3": {
                    "x": "567"
                }
            }
            """

        When I render the "template1" template:
            """
            stored - <val1.prop2>
            """
        Then I evaluate the stored value of "template1" using JS:
            """
            {
                "fun": "(data)=>data",
                "expected": "stored - test String"
            }
            """

        When I render the "template1" template:
            """
            stored - <val1.prop3.x>
            """

        Then I evaluate the stored value of "template1" using JS:
            """
            {
                "fun": "(data)=>data",
                "expected": "stored - 567"
            }
            """

    Scenario: Templates - generators
        # placeholder without brackets
        When I render the "date1" template:
            """
            date - <generateDate>
            """
        Then I evaluate the stored value of "date1" using JS:
            """
            {
                "fun": "(data) => data",
                "expected": "/^date [-] \\d{4}-\\d{2}-\\d{2}$/"
            }
            """

        # placeholder with empty brackets
        When I render the "date2" template:
            """
            <generateDate[]>
            """
        Then I evaluate the stored value of "date2" using JS:
            """
            {
                "fun": "(data) => data",
                "expected": "/^\\d{4}-\\d{2}-\\d{2}$/"
            }
            """

        # placeholder with params in brackets
        When I render the "date3" template:
            """
            <generateDate[DD-MM-YYYY]>
            """
        Then I evaluate the stored value of "date3" using JS:
            """
            {
                "fun": "(data) => data",
                "expected": "/^\\d{2}-\\d{2}-\\d{4}$/"
            }
            """


    Scenario: Templates - constansts
        When I render the "constants" template:
            """
            The value - <test>
            """
        Then I evaluate the stored value of "constants" using JS:
            """
            {
                "fun": "(data) => data",
                "expected": "The value - TEST STRING"
            }
            """

    Scenario: All together
        When I store the "valx" as:
            """
            textx
            """
        When I render the "all" template:
            """
            Date - <generateDate>
            The constant - <test>
            The value - <valx>
            """
        Then I evaluate the stored value of "all" using JS:
            """
            {
                "fun": "(data) => data",
                "expected": "Date - <generateDate>\nThe constant - <test>\nThe value - textx"
            }
            """