@regression @login
Feature: Example feature - DB connection

  Scenario Outline: Incorrect credentials - scenario: <scenarioName>

    Given I am on the login page
    When I login with <scenarioName>
    Then I should see a flash error message

    @debug
    Examples:
      | scenarioName                   |
      | invalid_user_name_and_password |
      | blank_user_name_and_password   |
      | user_name_and_blank_password   |
      | special_character_in_user_name |

