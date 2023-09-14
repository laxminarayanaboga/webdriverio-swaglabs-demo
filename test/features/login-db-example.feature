@regression @login
Feature: Example feature - DB connection

  Scenario Outline: incorrect username and password

    Given I am on the login page
    When I login with <scenarioName>
    Then I should see a flash error message

    @debug
    Examples:
      | scenarioName                   |
      | invalid_user_name_and_password |

