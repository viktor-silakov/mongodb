Feature: Simple API test

    Scenario:  Create user API test
        Given I send a post request to "users" with:
            """
            headers:
              accept: "application/json"
            data: |
                {
                    "name": "John",
                    "email": "j_doe@example.com",
                    "age": 20,
                    "isActive": true,
                    "hobbies": [
                        "circus",
                        "disco"
                    ]
                }
            """

        Then the response matches:
            """
            status: 201
            response: {
                "name": "John",
                "email": "j_doe@example.com",
                "age": 20,
                "isActive": true,
                "hobbies": [
                    "circus",
                    "disco"
                ]
            }
            """