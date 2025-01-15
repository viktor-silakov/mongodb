Feature: Handle API using controllers

    Scenario: Create resources with full set of fields
        # User
        When I create the User with:
            """
            name: John Doe
            email: jdoe@site.com
            age: 12
            isActive: true
            hobbies:
            - sport
            - tv
            """

        Then the stored object "User Response" should match:
            """
            {
                "url": "http://localhost:8088/users",
                "statusCode": 201,
                "statusText": "Created",
                "body": {
                    "name": "John Doe",
                    "email": "jdoe@site.com",
                    "age": 12,
                    "isActive": true,
                    "hobbies": [
                        "sport",
                        "tv"
                    ]
                }
            }
            """

        # Pet
        When I create the Pet with:
            """
            name: Fluffy
            age: 3
            type: cat
            """

        Then the stored object "Pet Response" should match:
            """
            {
                "url": "http://localhost:8088/pets",
                "statusCode": 201,
                "statusText": "Created",
                "body": {
                    "name": "Fluffy",
                    "age": 3,
                    "type": "cat"
                }
            }
            """

    Scenario: Create users with partial fields
        When I create the User with:
            """
            name: Jane Doe
            email: jane.doe@site.com
            """

        Then the stored object "User Response" should match:
            """
            {
                "url": "http://localhost:8088/users",
                "statusCode": 201,
                "statusText": "Created",
                "body": {
                    "name": "Jane Doe",
                    "email": "jane.doe@site.com",
                    "age": 19,
                    "isActive": false,
                    "hobbies": [
                        "fishing",
                        "hobby horsing"
                    ]
                }
            }
            """