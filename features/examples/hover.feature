@smoke
Feature: Hover on Element

  Scenario: Hover on Element
    When I open url "/?component=clicking"

    Then the button with name "Button role" should have CSS "color" to equal "rgb(255, 255, 255)"
    Then the button with name "Button role" should have attribute "class" to equal "bg-blue-500 text-white px-4 py-2 hover:bg-red-600 rounded mb-2 hover:text-yellow-300 hover:text-lg"
    When I hover on the button with name "Button role"
    Then the button with name "Button role" should have CSS "color" to equal "rgb(253, 224, 71)"
    Then the button with name "Button role" should have attribute "class" to equal "bg-blue-500 text-white px-4 py-2 hover:bg-red-600 rounded mb-2 hover:text-yellow-300 hover:text-lg hovered"
