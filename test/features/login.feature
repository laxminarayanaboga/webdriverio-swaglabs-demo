@regression @login
Feature: The Internet Guinea Pig Website

  Scenario Outline: As an authorised user, I can log into the secure area

    Given I am on the login page
    When I login with <username> and <password>
    Then I should see a flash message saying <message>

    Examples:
      | username | password             | message                        |
      | tomsmith | SuperSecretPassword! | You logged into a secure area! |


  Scenario Outline: I should not be able to access the secure area with incorrect login

    Given I am on the login page
    When I login with <username> and <password>
    Then I should see a flash message saying <message>

    Examples:
      | username | password | message                   |
      | foobar   | barfoo   | Your username is invalid! |
