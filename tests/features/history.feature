@subSuite=History

Feature: Weather Dashboard

    Background:
        Given I am in the Weather Dashboard webapp

    Scenario Outline: Should ADD '<city>' to the history
        When I search for '<city>'
        Then I can verify '<city>' is displayed in search title
        And I can verify '<city>' is added to the search history
        And I can verify search produced 5 forecast cards

        Examples:
            | city          |
            | Atlanta, GA   |
            | Santa Ana, CA |

    Scenario Outline: Should NOT ADD '<city>' to the history if already exist
        When I search for '<city>'
        Then I can verify '<city>' is displayed in search title
        And I can verify that only 1 '<city>' city name is displayed in history

        Examples:
            | city          |
            | Atlanta, GA   |
            | Santa Ana, CA |

    Scenario Outline: Should NOT ADD '<city>' to the history if not valid city
        When I search for '<city>'
        Then I can verify '<city>' is NOT displayed in search title
        And I can verify '<city>' is NOT added to the search history
        And I can verify search produced 0 forecast cards

        Examples:
            | city        |
            | Atlanta, FL |
            | XYZ, YZ     |

    Scenario Outline: Should DELETE '<city>' from history
        When I click on trash can button for '<city>'
        Then I can verify '<city>' as been deleted from history

        Examples:
            | city          |
            | Atlanta, GA   |
            | Santa Ana, CA |
